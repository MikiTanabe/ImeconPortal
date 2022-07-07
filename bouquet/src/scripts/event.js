import { db } from '@/firebase/firestore'
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
    console.log(criteria)
    // 検索条件に一致するIDを取得する
    const ids = await searchEvents(criteria)
    
    const docRef = db.collection('events')
    const snapShot = await docRef.where(db.FieldPath.documentId(), 'in', ids)
                                 .where('date', '>=', new Date())
                                 .orderBy('date', 'asc')
                                 .orderBy('upDate', 'asc')
                                 .get()
    var eventList = new Array()
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