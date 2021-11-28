const instagramApi = require("./functions/instagrmApi.js");
const instaListRepository = require("./firestore/instaListRepository.js");
const eventRepository = require("./firestore/eventRepository.js");
const listUtil = require("./functions/listUtil.js");
//ポート番号
const PORT = 3000;

//リクエスト元
const URL = "https://bouquet.local.com";

// expressモジュールをロードし、インスタンス化してappに代入
var express = require("express");
var app = express();

//3000番ポートで待ち受け
app.listen(PORT, () => { console.log("Node.js is listening to PORT: ${PORT}")});

/**
 *  Instagram投稿リストを返却する
 *  @param req リクエストオブジェクト
 *  @param res レスポンスオブジェクト
 *  */
app.get("/api/igmedia/list", async (req, res) => {
    try{
        const arrayName = await instaListRepository.getAllNameArray();
        const mediaList = await instagramApi.GetIgList(arrayName);
        let resultList = new Array();
        //リクエスト元URLの設定
        SetCORS(res);
        for(let medias of mediaList) {
            if (medias != null){
                for(let media of medias) {
                    let result = {
                        id: media.id,
                        url: media.permlink,
                        thumbnail_url: media.media_url,
                        caption: media.caption,
                        timestamp: media.timestamp
                    }
                    resultList.push(result);
                }
            }
        }
        listUtil.SortByTimestamp(resultList);
        res.json(resultList);
    } catch (e) {
        console.log(e);
        res.statusCode = 400;
    }
});

/**
 * イベントリストを取得する
 * @param req リクエストオブジェクト
 * @param res レスポンスオブジェクト
 */
app.get("/api/event/list", async (req, res) => {
    try{
        const eventList = await eventRepository.GetEventsArray();
        SetCORS(res);
        res.json(eventList);
    } catch (e) {
        console.log(e);
        res.statusCode = 400;
    }
})
//TODO: ユーザーのInstagramIdを受け取って、ビジネスアカウントならIDをigListDocumentに入れる。
//TODO: IgIdが変わってたらupdateする

/**
 * CORSを設定する
 * @param res 
 */
function SetCORS(res) {
    res.set({'Access-Control-Allow-Origin': URL});
    res.set({'Access-Control-Allow-Headers': 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept'})
    res.set({'Access-Control-Allow-Credentials': 'true'})
}
