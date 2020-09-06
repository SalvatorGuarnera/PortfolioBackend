const config = require('../util/config');
const admin = require("firebase-admin");  


admin.initializeApp(
    {
        serviceAccountId: 'website-d4dc2@appspot.gserviceaccount.com',
        storageBucket: "website-d4dc2.appspot.com"
    }
);

const db = admin.firestore(); 

module.exports = {admin, db};