import * as firebase from 'firebase'
// import 'firebase/storage' // if you will use 'storage

const DB_CONFIG = {
    apiKey: "AIzaSyDk7z1chFKeSDUY-LF6TmiSxaQN3O5O6ug",
    authDomain: "react-redux-firebase-c6eb2.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-c6eb2.firebaseio.com",
    projectId: "react-redux-firebase-c6eb2",
    storageBucket: "react-redux-firebase-c6eb2.appspot.com",
    messagingSenderId: "615808479501",
}

const app = firebase.initializeApp(DB_CONFIG)

export const database = app.database()
export const auth = app.auth()
// export const storage = app.storage().ref

export default database