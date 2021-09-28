import firebase from 'firebase'
import json from'@/firebaseconfig.json'

let firebaseconfig = {
    apiKey: json.apiKey,
    authDomain: json.autoDomain,
    databaseURL: json.databaseURL,
    projectId: json.projectId,
    storageBucket: json.storageBucket,
    messagingSenderId: json.messagingSenderId,
    appId: json.appId,
    measurementId: json.measurementId
}

firebase.initializeApp(firebaseconfig)

export default firebase
export const db = firebase.firestore()
export const fs = firebase.storage()
export const fsRef = firebase.storage().ref()
export const auth = firebase.auth()