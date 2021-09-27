//ポート番号
const PORT = 3000;

//リクエスト元
const URL = 'https://bouquet.local.com';

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

//投稿リストを返却する
app.get("/api/photo/list", function(req, res, next){
    //リクエスト元URLの設定    
    res.set({'Access-Control-Allow-Origin': URL});
    res.json(igList);
});