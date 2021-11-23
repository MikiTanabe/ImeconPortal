//設定ファイル読み込み
const config = require('../graphapi.config.json')
//instagram メディアURL
const IG_MEDIA_URL = "https://graph.instagram.com/";
//instagram GraphAPI URL
const GRAPH_API_URL = 'https://graph.facebook.com/v12.0/';
//instagrap GraphAPI buisiness_discovery エンドポイント
const BUISINESS_DISCOVERY_EP = '?fields=business_discovery.username';
//GraphAPIアクセストークン
const IG_TOKEN = '&access_token=' + config.token;
//GraphAPI用Instagramビジネスアカウント用ID
const IG_B_ACCOUNT = config.buisinessAccountId;

const objectUtil = require('./objectUtil.js');
const axios = require('axios');

/**
 * Instagram投稿クラス
 */
 class IgMedia {
     /**
      * コンストラクタ
      * @param {String} mediaType メディアタイプ
      * @param {String} url 投稿URL(Instagramへのリンク)
      * @param {String} thumbnailUrl サムネイルURL（VIDEOのみ)
      * @param {String} mediaUrl メディアURL
      * @param {Date} timestamp 投稿日付
      */
    constructor(media, url) {
        this.media = media;
        this.url = url;
    }
}

/**
 * FBログイン承認済みのユーザのInstagram投稿メディアIDを取得する
 * @param {Array} arrayNames ビジネスユーザ名配列
 * @returns {Array} メディアリスト
 * */
module.exports.GetIgList = async function (arrayNames) {
    //メディア取得用文字列
    const POST_COUNT = 4;
    const gettingMedia = '{'
        + 'media.limit(' + POST_COUNT
        + '){'
        + 'media_url,'
        + 'permalink,'
        + 'timestamp,'
        + 'caption'
         + '}}';
    let mediaList = new Array();
    for await (let name of arrayNames){
        let url = GRAPH_API_URL + IG_B_ACCOUNT
                  + BUISINESS_DISCOVERY_EP
                  + '('+ name +')'+ gettingMedia
                  + IG_TOKEN;
                  console.log(url);
        mediaList.push(
            await axios.get(url)
            .then(response => {
                console.log(response);
                if (response.statusText == 'OK'){
                    return response.data.business_discovery.media.data
                }
            })
            .catch(error => {
                console.log(error);
                return null;
            })
        );
    }
    console.log(mediaList);
    return mediaList;
};