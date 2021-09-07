var firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyCJ8_C6ZK4fW4POKe5sf8kv6zIrNGjUnis",
  authDomain: "nn44-5952a.firebaseapp.com",
  databaseURL: "https://nn44-5952a-default-rtdb.firebaseio.com",
  projectId: "nn44-5952a",
  storageBucket: "nn44-5952a.appspot.com",
  messagingSenderId: "1020405141556",
  appId: "1:1020405141556:web:26b21d34506cc337913a61"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;