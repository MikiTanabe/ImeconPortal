import firebase from '@/firebase/firestore.js'

export async function getUser () {
    var mapUser = new Map()
    const user = await firebase.auth().currentUser
    if (user) {
        mapUser.set('id', user.uid)
        mapUser.set('name', user.displayName)
    }
    return mapUser
}