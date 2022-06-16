import { db } from '@/firebase/firestore'

/**
 * ユーザIDからコンサルタントデータを取得する
 * @param {String} uid ユーザID
 * @returns consultantドキュメント
 */
export async function getConsultantData(uid) {
    const docRef = db.collection('consultants').where('uid', '==', uid)
    const docs = await docRef.get()
    if (docs.empty) {
        return null;
    }
    var docConsultant = null;
    docs.forEach(doc => {
        if (doc.exists) {
            docConsultant = doc;
        }
    })
    return docConsultant;
}