const instagramApi = require("./functions/instagrmApi.js");
const instaListRepository = require("./firestore/instaListRepository.js");
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

/** Instagram投稿リストを返却する */
app.get("/api/photo/list", async (req, res) => {
    try{
        const arrayName = await instaListRepository.getAllNameArray();
        const mediaList = await instagramApi.GetIgList(arrayName);
        let resultList = new Array();
        //リクエスト元URLの設定
        res.set({'Access-Control-Allow-Origin': URL});
        res.set({'Access-Control-Allow-Headers': 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept'})
        res.set({'Access-Control-Allow-Credentials': 'true'})
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
//TODO: ユーザーのInstagramIdを受け取って、ビジネスアカウントならIDをigListDocumentに入れる。
//TODO: IgIdが変わってたらupdateする
//↑のidを使って投稿をリスト表示
