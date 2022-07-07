import Typesense from 'typesense'
import config from '@/typesenseConfig.json'
import { db } from '@/firebase/firestore'
import { makeBigram } from '@/scripts/functions'

export const DATE_COMPARISON_NOUSE = -1
export const DATE_COMPARISON_TODAY = 0
export const DATE_COMPARISON_BEFORE = 1
export const DATE_COMPARISON_AFTER = 2

// TODO: https-portalにSSLで接続
const client = new Typesense.Client({
    'nodes': [{
        'host': 'imecon.portal.typesense',
        'port': '443',
        'protocol': 'https'
    }],
    'apiKey': config.typesense_api_key,
    'connectionTimeoutSeconds': 2
})

const eventCollection = {
    'name': 'events',
    'fields': [
        {'name': 'id', 'type': 'string'},
        // {'name': 'title', 'type': 'string'},
        // {'name': 'introduction', 'type': 'string'},
        // {'name': 'salonName', 'type': 'string'},
        {'name': 'allStr', 'type': 'string'},
        {'name': 'date', 'type': 'int64'},
    ],
    'default_sorting_field': 'date'
}

client.collections('events').exists()
.then(exists => {
    return new Promise((resolve) => {
        if (!exists){
            console.log('イベントドキュメント作成')
            client.collections().create(eventCollection)
            resolve()
        }
        console.log('イベントドキュメント既存')
        resolve()
    })
})
.then(() => copyData())
.catch(() => {})

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
export async function copyData () {
    console.log('コピー開始')
    let events = await client.collections('events')
                             .retrieve()
    if (0 < events.num_documents) {
        // すでにtypesenseにeventsドキュメントが存在したら終了
        console.log('コピー終了: ', events)
        return 0
    }
    const snap = await db.collection('events').get()
    if(snap.empty) {
        // firebaseにデータがなかったら終了
        console.log('firestoreにデータなし')
        return 0
    }
    console.log('snap: ', snap)
    snap.forEach(async doc => {
        const data = doc.data()
        const document = {
            id: doc.id,
            allStr: makeBigram(data.title) + ' '
                    + makeBigram(data.introduction) + ' '
                    + makeBigram(data.salonName) + ' '
                    + makeBigram(data.consultantName),
            date: data.date.toMillis()
        }
        console.log('event document:', document)
        // eventsドキュメントをtypesenseコレクションに追加する
        await client.collections('events').documents().create(document)
    })
    events = await client.collections('events').retrieve()
    return events.num_documents
}

/**
 * イベントを検索する
 * @param {*} criteria 
 */
export async function searchEvents (criteria) {
    console.log('criteria:', criteria)
    var filterString = ''
    var queryString = ''
    // ----------------------
    // 日付
    // ----------------------
    if (criteria.date != undefined && criteria.dateComparison != 0) {
        var q_date = 'date:'
        const dateMillis = Date.parse(criteria.date)
        if (criteria.dateComparison == DATE_COMPARISON_AFTER) {
            // 以降
            q_date += '>='
        } else if (criteria.dateComparison == DATE_COMPARISON_BEFORE) {
            // より前
            q_date += '<'
        } else if (criteria.dateComparison == DATE_COMPARISON_TODAY) {
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
    console.log('queryString: ', queryString)
    const search = {
        'q': queryString,
        'query_by': 'allStr',
        'filter_by': filterString
    }
    let result = await client.collections('events').documents().search(search)
    var aryId = []
    result.hits.forEach(hit => {
        aryId.push(hit.document.id)
    })
    console.log('searched: ', aryId)
    return aryId
}