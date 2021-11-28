const db = require('./firebaseContext.js');

/**eventsコレクションから開催日付が本日までのイベントを取得する */
module.exports.GetEventsArray = async function () {
    const eventRef = db.collection('events');
    const snapShot = await eventRef.where('date', '>=', new Date())
                                   .orderBy('date', 'desc')
                                   .orderBy('upDate', 'desc')
                                   .limit(5)
                                   .get();
    let eventList = new Array();
    snapShot.forEach(doc => {
        if (doc.exists) {
            console.log(doc.data())
            eventList.push(doc.data());
        }
    });

    return eventList;
};