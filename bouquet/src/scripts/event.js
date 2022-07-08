import { db } from '@/firebase/firestore'
import firestore from '@/firebase/firestore'
 // import { isNullOrEmpty } from './functions'
import { searchEvents, DATE_COMPARISON_TODAY } from '@/scripts/typesenseManager'

export class SearchEventCriteria {
    /**
     * コンストラクタ
     */
    constructor() {
        this.date = new Date()
        this.dateComparison = DATE_COMPARISON_TODAY
        // this.host = ''
        this.keyWords = ''
        console.log('SearchEventCriteria created!')
    }
}

/**
 * イベント検索処理
 * @param {SearchEventCriteria} criteria 
 */
export async function eventSearch(criteria) {
    var eventList = new Array()
    // 検索条件に一致するIDを取得する
    const ids = await searchEvents(criteria)
    if (ids.length == 0) {
        return eventList
    }
    const docRef = db.collection('events')
    const snapShot = await docRef.where(firestore.firestore.FieldPath.documentId(), 'in', ids)
                                 // .orderBy('date', 'asc')
                                 // .orderBy('upDate', 'asc')
                                 .get()
    if (snapShot.empty) {
        console.log('event返却値(empty): ', eventList)
        return eventList
    }
    snapShot.forEach(doc => {
        eventList.push({
            id: doc.id,
            data: doc.data()
        })
    })

    console.log('event返却値: ', eventList)
    return eventList
}