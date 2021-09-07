
var admin = require("firebase-admin");

var serviceAccount = require("../nn44-5952a-firebase-adminsdk-ziuxh-7dcbab2aa6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nn44-5952a-default-rtdb.firebaseio.com"
});

var db = admin.database();

module.exports = db;