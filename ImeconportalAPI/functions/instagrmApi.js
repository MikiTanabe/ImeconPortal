//設定ファイル読み込み
const config = require('../graphapi.config.json')
//instagram メディアURL
const IG_MEDIA_URL = "https://graph.instagram.com/";
//instagram GraphAPI URL
const GRAPH_API_URL = 'https://graph.facebook.com/v12.0/';
//instagrap GraphAPI buisiness_discovery エンドポイント
const BUISINESS_DISCOVERY_EP = '?fields=business_discovery.username';
//GraphAPIアクセストークン
const IG_TOKEN = '?token=' + config.token;
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
      * @param {String} id IDIG
      * @param {String} media IDMEDIA
      * @param {String} url 投稿URL(Instagramへのリンク)
      */
    constructor(id, media, url) {
        this.id = id;
        this.media = media;
        this.url = url;
    }
}

/**
 * FBログイン承認済みのユーザのInstagram投稿を取得する
 * @param arrayId IGID配列
 * @returns IgMediaクラス
 * */
module.exports.getIgList = async function (arrayNames) {
    //メディア取得用文字列
    const gettingMedia = '{media}';
    let content = new Array();
    for await (let name of arrayNames){
        let url = GRAPH_API_URL + IG_B_ACCOUNT
                  + BUISINESS_DISCOVERY_EP
                  + '('+ name +')'+ gettingMedia
                  + IG_TOKEN;
                  console.log(url);
        content.push(
            await axios.get(url)
            .then(response => {
                console.log(response);
                if (response.statusText == 'OK'){
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error);
                return null;
            })
        );
    }
    return content;
};