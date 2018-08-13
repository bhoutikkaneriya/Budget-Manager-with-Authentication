import * as firebase from 'firebase';

// var config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//   };
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

console.log("NODE_ENV",process.env.NODE_ENV) 
console.log("API_KEY",process.env.API_KEY)

firebase.initializeApp(config);



// firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider ,database as default };

// database.ref('attributesa').remove().then(() => {
//     console.log('done')
// }).catch((e) => {
//     console.log('error ')
// })

// database.ref('isSingles').remove().then(() => { console.log('success') }).catch((e) => { console.log('error')})

// database.ref().update({
//     name : 'bhoutik',
//     'location/city' : 'Boston' 
// })

// database.ref().once('value').then((snapshot) => {
//     const value = snapshot.val();
//     console.log(value)
// }).catch((e) => {
//     console.log(e)
// })

// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// })

// database.ref('notes').push({
//     title : '1',
//     body : 'asdada'
// })

// database.ref('notes').push({
//     title : '2',
//     body : 'fdsdfsdfsfds'
// })

// database.ref('notes').remove()

// database.ref('expenses').push({
//         description : 'rent',
//         amount : 297.00,
//         createdAt : 45,
//         note : 'Jan rent'
//     })

//     database.ref('expenses').push({
//         description : 'tmobile',
//         amount : 30.00,
//         createdAt : 90,
//         note : 'Jan phone bill'
//     })


// var promise = new Promise((resolve,reject) => {
//     resolve('solved')
// })

// promise.then((data) => {
//     console.log(data)
// }).catch((error) => {
//     console.log(error)
// })