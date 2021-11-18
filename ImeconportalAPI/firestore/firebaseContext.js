//firestore
const fbAdmin = require('firebase-admin');
const serviceAccount = require('../bouquet-e3ec0-firebase-adminsdk-lals6-59bd9cdf53.json')
fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceAccount)
});
/**Bouquet firestore */
module.exports = fbAdmin.firestore();
