const Typesense = require('typesense')
const api_key = require('./api_key.json')
const db = require('../firestore/firebaseContext.js')
const stringUtil = require('./stringUtil.js')

const client = new Typesense.Client({
    'nodes': [{
        'host': 'imecon.portal.typesense',
        'port': '443',
        'protocol': 'https'
    }],
    'apiKey': api_key.typesense_local_key,
    'connectionTimeoutSeconds': 2
})

const eventCollection = {
    'name': 'events',
    'fields': [
        {'name': 'id', 'type': 'string'},
        // {'name': 'title', 'type': 'string'},
        // {'name': 'introduction', 'type': 'string'},
        // {'name': 'salonName', 'type': 'string'},
        {'name': 'allStr', 'type': 'string', 'infix': 'true'},
        {'name': 'date', 'type': 'int64'},
    ],
    'default_sorting_field': 'date'
}

// client.collections().create(eventCollection)

/**
 * イベント作成時
 */
//module.exports.onEventCreate = db.collection('/events/{eventId}')
//                         .onCreate((snapshot, context) => {
//                             id = context.params.eventId
//                             const { title, introduction, salonName, consultantName, date }
//                             = snapshot.data()
//                             document = {
//                                   id,
//                                   allStr: stringUtil.makeBigram(title) + ' '
//                                           + stringUtil.makeBigram(introduction) + ' '
//                                           + stringUtil.makeBigram(salonName) + ' '
//                                           + stringUtil.makeBigram(consultantName),
//                                   date: date.toMillis()
//                             }
//
//                             // eventsドキュメントをtypesenseコレクションに追加する
//                             return client.collections('events').documents().create(document)
//                         })

/**
 * イベント更新時
 */
// module.exports.onEventUpdate = db.document('/events/{eventId}')
//                           .onUpdate((cahnge, context) => {
//                               // 更新値を取得する
//                               const { id, title, introduction, salonName, consultantName, date }
//                               = change.after.data()
//                               document = {
//                                   id,
//                                   allStr: stringUtil.makeBigram(title) + ' '
//                                           + stringUtil.makeBigram(introduction) + ' '
//                                           + stringUtil.makeBigram(salonName) + ' '
//                                           + stringUtil.makeBigram(consultantName),
//                                   date: date.toMillis()
//                               }
//                               return client.collections('events').documents(id).update(document)
//                           })

/**
 * イベント削除時
 */
// module.exports.onEventDelete = db.firestore.document('events/{eventId}')
//                           .onDelete((snap, context) => {
//                               // 削除するデータのIDを取得する
//                               id = context.params.eventId
// 
//                               return client.collections('event').documents(id).delete()
//                           })

/**
 * eventsコレクションをtypesenseにコピーする
 * @returns 処理件数
 */
module.exports.copyData = async function () {
    let events = await client.collections('events')
                               .retrieve()
    if (0 < events.num_documents) {
        // すでにtypesenseにeventsドキュメントが存在したら終了
        return 0
    }
    db.collection('events').get().foreach(snap => {
        if(snap.empty) {
            // firebaseにデータがなかったら終了
            return 0
        }
        snap.foreach(async doc => {
            const data = doc.data()
            const document = {
                id: doc.id,
                allStr: stringUtil.makeBigram(data.title) + ' '
                        + stringUtil.makeBigram(data.introduction) + ' '
                        + stringUtil.makeBigram(data.salonName) + ' '
                        + stringUtil.makeBigram(data.consultantName),
                date: data.date.toDate()
            }
            // eventsドキュメントをtypesenseコレクションに追加する
            await client.collections('events').documents().create(document)
        })
    })
    events = client.collections('events').retrieve()
    return events.num_documents
}

/**
 * イベントを検索する
 * @param {*} criteria 
 */
module.exports.searchEvents = async function (criteria) {
    var filterString = ''
    var queryString = ''
    // ----------------------
    // 日付
    // ----------------------
    if (criteria.date != undefined && criteria.dateComparison != 0) {
        var q_date = 'date:'
        const dateMillis = Date.parse(criteria.date)
        if (criteria.dateComparison == 1) {
            // 以降
            q_date += '>='
        } else if (criteria.dateComparison == 2) {
            // より前
            q_date += '<'
        } else if (criteria.dateComparison == 3) {
            // 当日
            q_date += '='
        }
        q_date += dateMillis
        filterString += q_date
    }
    // ----------------------
    // キーワード
    // ----------------------
    // TODO: のちにカテゴリとか。現在はフリーワード検索のみ実装する。
    if (criteria.keyWords != undefined && criteria.keyWords != '') {
        queryString += criteria.keyWords
    } else {
        queryString += '*'
    }
    const search = {
        'q': queryString,
        'query_by': 'allStr',
        'filter_by': filterString
    }
    let result = await client.collections('events').documents().search(search)
    var aryId = []
    result.hits.foreach(hit => {
        aryId.push(hit.document.id)
    })
    return aryId
}