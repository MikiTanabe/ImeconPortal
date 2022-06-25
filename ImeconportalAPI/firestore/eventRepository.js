const db = require('./firebaseContext.js')
const typesenseManager = require('../functions/typesenseManager.js');
const { doc } = require('./firebaseContext.js');

/**
 * eventsコレクションから開催日付が本日までのイベントを取得する
*/
module.exports.GetEventsArray = async function () {
    const eventRef = db.collection('events');
    const snapShot = await eventRef.where('date', '>=', new Date())
                                   .orderBy('date', 'asc')
                                   .orderBy('upDate', 'asc')
                                   .limit(5)
                                   .get()
    let eventList = new Array()
    if (snapShot.empty) {
        return null
    }
    snapShot.forEach(doc => {
        if (doc.exists) {
            console.log(doc.data())
            eventList.push({
                id: doc.id,
                date: doc.data().date.toDate(),
                data: doc.data()
            })
        }
    })
    return eventList
};

/**
 * ユーザIDをキーに、eventsコレクションから開催日付が本日以降のイベントを取得する
 * @param {string} uid ユーザID
 */
module.exports.GetEventsArrayByUserId = async function (uid) {
    const eventRef = db.collection('events');
    const snapShot = await eventRef.where('date', '>=', new Date())
                                   .where('uid', '==', uid)
                                   .orderBy('date', 'asc')
                                   .orderBy('upDate', 'asc')
                                   .get()
    let eventList = new Array();
    if (snapShot.empty) {
        return null
    }
    snapShot.forEach(doc => {
        if (doc.exists) {
            eventList.push({
                id: doc.id,
                date: doc.data().date.toDate(),
                data: doc.data()
            })
        }
    })

    return eventList
}

module.exports.SearchEventData = async function (criteria) {
    // 検索条件に一致するIDを取得する
    const ids = await typesenseManager.searchEvents(criteria)

    const docRef = db.collection('events')
    const snapShot = await eventRef.where(db.FieldPath.documentId(), 'in', ids)
                                   .where('date', '>=', new Date())
                                   .orderBy('date', 'asc')
                                   .orderBy('upDate', 'asc')
                                   .get()
    var eventList = []
    if (snapShot.empty) {
        return eventList
    }
    snapShot.forEach(doc => {
        eventList.push({
            doc
        })
    })

    return eventList
}