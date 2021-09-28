import { db } from '@/firebase/firestore'

export async function getSalonDataUid(uId) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('salons').where("userID", "==", uId)
        docRef.get().then(docSnap => {
            docSnap.forEach(doc => {
                var objSalon = doc.data()
                objSalon.id = doc.id
                resolve(objSalon)
            })
        }).catch((e) => {
            reject(e)
        })
    })
}