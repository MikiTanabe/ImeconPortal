import { db } from '@/firebase/firestore'

/**
 * ユーザIDからサロン情報を取得する
 * @param {*} uid ユーザID
 * @returns salonドキュメント
 */
export async function getSalonData(uid) {
    const docRef = db.collection('salons')
                     .where('userID', '==', uid);
    const docs = await docRef.get();
    if (docs.empty) {
        return null;
    }
    var docSalon = null
    docs.forEach(doc => {
        if (doc.exists) {
            docSalon = doc;
        }
        return;
    })
    return docSalon;
}