//設定ファイル読み込み
const config = require('../youtuDataApi.config.json');
//instagram メディアURL
const OAUTH2_CLIENT_ID = config.client_id;
//youtube OAUTH2用SCOPES
const OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube.readonly'
];

const axios = require('axios');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const readline = require('readline');
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE)
                  + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'bouquet-youtube.json';
const { credential } = require('firebase-admin');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const { connect } = require('http2');

/**
 * OAuth2認証フロー
 * @param { Array } channelIdList youtubeチャンネルID配列
 * @returns { Object } Youtube動画情報リスト
 */
module.exports.getYoutuAuth = function (channelIdList) {
    fs.readFile('./functions/client_secret.json', function processclientSecrets(err, content) {
        if (err) {
            //TODO: client_secretファイルのパス見直し
            console.log('Error loading client secret file: ', + err);
            return;
        }
        authorize(JSON.parse(content), getChannel, channelIdList);
    });
}

/**
 * Firebase youtuListCollectionにあるIDの投稿動画を日付順に5件取得する
 * @param {Array} channelIdList YoutubeチャンネルIDリスト
 * @returns {Object} Youtubeチャンネル情報リスト
 */
module.exports.getYoutubeAll = async function (channelIdList) {
    let youtuList = new Array();
    try{
        for await(let id of channelIdList)
        {
            youtuList = youtuList.concat(await axios.get(await getUrl(id))
            .then(response => {
                console.log(response);
                if (response.statusText == 'OK'){
                    return response.data.items;
                }
            })
            .catch(error => {
                console.log(error);
                return null;
            }));
        }
        console.log(youtuList);
    } catch (e) {
        console.log('Error loading client secret file: ' +  e);
        return null;
    }
    return youtuList;
}

/**
 * チェンネルIDから、投稿動画を取得するURLを生成する
 * @param {String} id 
 * @returns 投稿動画を取得するURL
 */
async function getUrl(id) {
    const content = await fs.promises.readFile('./functions/api_key.json');

    return 'https://www.googleapis.com/youtube/v3/search?key='
    + JSON.parse(content).key
    + '&part=snippet&channelId=' + id
    + '&order=date&type=video'
}

/**
 * OAuthクライアントをcredentialから作製し、コールバック関数を呼び出す
 * @param { Object } credentials 
 * @param {*} callback
 * @param {Array} channelIdList youtubeチャンネルID配列
 */
function authorize(credentials, callback, channelIdList)
{
    try {
        const clientSecret = credentials.web.client_secret;
        const clientId = credentials.web.client_id;
        const redirectUrl = 'https://bouquet.local.com'
        const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

        //すでにトークンを取得済みかチェックする
        fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
                getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                callback(oauth2Client, channelIdList);
            }
        })
    } catch (e) {
        console.log('Falied to authorize: ', + e);
    }
}

/**
 * トークンを保存する
 * @param {Object} token 
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    })
}

/**
 * 新しいトークンを取得する
 * @param {OAuth2}} oauth2Client 
 * @param {*} callback コールバック関数
 * @param {Array} channelIdList youtubeチャンネルID配列
 */
function getNewToken(oauth2Client, callback, channelIdList) {
    const authUrl = oauth2Client.generateAuthUrl( {
        access_type: 'offline',
        scope: OAUTH2_SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    let r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.question('Enter the code from that page here: ', function(code) {
        r1.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client, channelIdList);
        })
    })
}

/**
 * チャンネルID配列からYoutube動画を取得する
 * @param {} auth 
 * @returns チャンネル情報配列
 */
function getChannel (auth, channelIdList) {
    const service = google.youtube('v3');
    let resChannnelList = new Array();
    for (let id in channelIdList)
    {
        service.channels.list({
            auth: auth,
            part: 'snippet, contentDetails, statistics',
            id: id
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return null;
            }
            const channels = response.data.items;
            if (channels.length == 0)
            {
                console.log('No such a channel found.');
            } else {
                for (let channel in channels)
                {
                    resChannnelList.push(
                        {
                            id: channel.id,
                            title: channel.title
                        }
                    )
                }
                return resChannnelList;
            }
        })
    }
    
}