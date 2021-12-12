const db = require('./firebaseContext.js');

/**youtubeドキュメントからすべてのチャンネルIDを取得する */
module.exports.getAllIdArray = async function () {
    const youtuIdRef = db.collection('youtulist').doc('idlist');
    const doc = await youtuIdRef.get();
    if (doc.exists) {
        console.log(doc.data()['ids'])
        return doc.data()['ids'];
    } else {
        return null;
    }
};