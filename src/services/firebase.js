const admin = require("firebase-admin");
require('firebase/database')
require('dotenv/config');

var serviceAccount = require("../../src/resources/serviceAccountCredentials.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");

module.exports = ref

