const instagramApi = require("./functions/instagrmApi.js");
const instaListRepository = require("./firestore/instaListRepository.js");
const eventRepository = require("./firestore/eventRepository.js");
const listUtil = require("./functions/listUtil.js");
const youtuRepository = require("./firestore/youtubeRepository.js");
const youtuApi = require("./functions/youtuApi.js");
const typesenseManager = require('./functions/typesenseManager.js')
const youtuUrl = "https://www.youtube.com/watch?v=";

//ポート番号
const PORT = 3000;

//リクエスト元
const URL = "https://bouquet.local.com";

// expressモジュールをロードし、インスタンス化してappに代入
var express = require("express");
var app = express();

// typesenseの用意
typesenseManager.copyData()
typesenseManager.onEventCreate()
typesenseManager.onEventUpdate()
typesenseManager.onEventUpdate()

//3000番ポートで待ち受け
app.listen(PORT, () => { console.log("Node.js is listening to PORT: ${PORT}")});

/**
 *  Instagram投稿リストを返却する
 *  @param req リクエストオブジェクト
 *  @param res レスポンスオブジェクト
 *  */
app.get("/api/igmedia/list", async (req, res) => {
    try{
        //リクエスト元URLの設定
        SetCORS(res);
        const arrayName = await instaListRepository.getAllNameArray();
        const mediaList = await instagramApi.GetIgList(arrayName);
        let resultList = new Array();
        for(let medias of mediaList) {
            if (medias != null){
                for(let media of medias) {
                    let result = {
                        id: media.id,
                        url: media.permalink,
                        thumbnail_url: media.media_url,
                        caption: media.caption,
                        timestamp: media.timestamp
                    }
                    resultList.push(result);
                }
            }
        }
        listUtil.sortByTimestamp(resultList);
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
        SetCORS(res)
        var eventList = {}
        if (req.query.uid == '' || req.query.uid == undefined) {
            eventList = await eventRepository.GetEventsArray()
        } else {
            eventList = await eventRepository.GetEventsArrayByUserId(req.query.uid)
        }
        res.json(eventList);
    } catch (e) {
        console.log(e);
        res.statusCode = 400;
    }
})


//TODO: ユーザーのInstagramIdを受け取って、ビジネスアカウントならIDをigListDocumentに入れる。
//TODO: IgIdが変わってたらupdateする

/**
 * Youtube動画リストを取得する
 * @param res レスポンスオブジェクト 
 * @param req リクエストオブジェクト
 */
app.get("/api/movie/list", async (req, res) => {
    try{
        SetCORS(res);
        const channelIdList = await youtuRepository.getAllIdArray();
        const channelList = await youtuApi.getYoutubeAll(channelIdList);
        let movieList = new Array();
        for(let channel of channelList){
            console.log(channel);
            movieList.push({
                id: channel.id.videoId,
                url: youtuUrl + channel.id.videoId,
                thumbnails: channel.snippet.thumbnails,
                channelTitle: channel.snippet.channelTitle,
                title: channel.snippet.title,
                description: channel.snippet.description,
                timestamp: channel.snippet.publishTime
            });
        }
        listUtil.sortByTimestamp(movieList);
        res.json(movieList);
    } catch (e) {
        console.log(e);
        res.statusCode = 400;
    }
});

/**
 * イベントを検索する
 * @param res レスポンスオブジェクト
 * @oaram req リクエストオブジェクト
 */
app.post('/api/typesense/events/list', async (req, res) => {
    try {
        SetCORS(res)
        const criteria = req.body.criteria
        const searchResults = await eventRepository.SearchEventData(criteria)
        res.json(searchResults)
        // TODO: Vueの方で検索結果呼び出し
    } catch(e) {
        console.log(e)
        res.statusCode = 400
    }
})

/**
 * CORSを設定する
 * @param res 
 */
function SetCORS(res) {
    res.set({'Access-Control-Allow-Origin': URL});
    res.set({'Access-Control-Allow-Headers': 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept'})
    res.set({'Access-Control-Allow-Credentials': 'true'})
}
