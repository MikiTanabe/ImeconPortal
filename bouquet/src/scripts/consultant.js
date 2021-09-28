import { db } from '@/firebase/firestore'

export function getConsultantData(uid) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('consultants').where('uid', '==', uid)
        docRef.get().then(docSnap => {
            var consulData = new Map()
            docSnap.forEach(doc => {
                consulData.set('name', doc.get('consulName'))
                consulData.set('salonName', doc.get('salonName'))
            })
            resolve(consulData)
        }).catch(() => {
            reject()
        })
    })
    
}