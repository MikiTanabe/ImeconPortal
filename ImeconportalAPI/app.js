const instagramApi = require("./functions/instagrmApi.js");
const instaListRepository = require("./firestore/instaListRepository.js");
//ポート番号
const PORT = 3000;

//リクエスト元
const URL = "https://bouquet.local.com";

// expressモジュールをロードし、インスタンス化してappに代入
var express = require("express");
var app = express();

//3000番ポートで待ち受け
app.listen(PORT, () => { console.log("Node.js is listening to PORT: ${PORT}")});

//InstagramAPIから投稿リストを返却する
var igList = {
    igId: "001",
    name: "hanako"
};

/** Instagram投稿リストを返却する */
app.get("/api/photo/list", async (req, res) => {
    try{
        const arrayName = await instaListRepository.getAllNameArray();
        const content = await instagramApi.getIgList(arrayName);
        //リクエスト元URLの設定    
        res.set({'Access-Control-Allow-Origin': URL});
        res.set({'Access-Control-Allow-Headers': 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept'})
        res.set({'Access-Control-Allow-Credentials': 'true'})
        res.json(content);
    } catch (e) {
        console.log(e);
        res.statusCode = 400;
    }
});
//TODO: ユーザーのInstagramIdを受け取って、ビジネスアカウントならIDをigListDocumentに入れる。
//TODO: IgIdが変わってたらupdateする
//↑のidを使って投稿をリスト表示
