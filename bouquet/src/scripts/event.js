import { db } from '@/firebase/firestore'
import { isNullOrEmpty } from './functions'

export const DATE_COMPATE_ALL = 0
export const DATE_COMPARE_BEFORE = 1
export const DATE_COMPARE_AFTER = 2
export const DATE_COMPARE_TODAY = 3

export class SearchEventCriteria {
    /**
     * コンストラクタ
     */
    constructor() {
        this.date = new Date()
        this.dateComparison = this.DATE_COMPARE_ALL
        this.host = ''
        this.freeWord = ''
    }
}

/**
 * イベント検索処理
 * @param {SearchEventCriteria} criteria 
 */
export async function eventSearch(criteria) {
    const docRef = db.collection('events')
    var comparison
    var query
    
    // TODO: typesenseで検索
    if (criteria.date != undefined && isNullOrEmpty(criteria.date)) {
        // 検索条件に日付が入っている場合
        switch (criteria.dateComparison) {
            case DATE_COMPARE_ALL:
                break
            case DATE_COMPARE_BEFORE:
                comparison = '<='
                break
            case DATE_COMPARE_TODAY:
                comparison = '=='
                break
            case DATE_COMPARE_AFTER:
                comparison = '>='
                break
        }
        query = docRef.where('date', comparison, criteria.date)
    }
}