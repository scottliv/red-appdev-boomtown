import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: 'AIzaSyAoaZmhUmdogNAugEG_2TJQNZXmJ2Pwbx4',
    authDomain: 'boomtown-fd020.firebaseapp.com',
    databaseURL: 'https://boomtown-fd020.firebaseio.com',
    projectId: 'boomtown-fd020',
    storageBucket: 'boomtown-fd020.appspot.com',
    messagingSenderId: '419380082123'
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseStorage = firebase.storage();

export { firebaseApp, firebaseAuth, firebaseStorage };
