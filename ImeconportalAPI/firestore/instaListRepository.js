const db = require('./firebaseContext.js');

/**instaListドキュメントからすべてのIGNameを取得する */
module.exports.getAllNameArray = async function () {
    const igNameRef = db.collection('instaList').doc('igNames');
    const doc = await igNameRef.get();
    if (doc.exists) {
        console.log(doc.data()['names'])
        return doc.data()['names'];
    } else {
        return null;
    }
};