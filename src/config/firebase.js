import * as firebase from 'firebase'

const DB_CONFIG = {
    apiKey: "<your-apiKEY>",
    authDomain: "<your-authDomain>",
    databaseURL: "<your-databaseURL>",
    projectId: "<your-projectId>",
    storageBucket: "<your-storageBucket>",
    messagingSenderId: "<your-messagingSenderId>",
}

const app = firebase.initializeApp(DB_CONFIG)

export const database = app.database()
export const auth = app.auth()
// export const storage = app.storage().ref

export default database