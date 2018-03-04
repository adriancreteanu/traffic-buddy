import firebase from 'firebase';
import { firebaseConfig } from '../config/FirebaseConfig';

export default class SuperService {

    firebaseApp: firebase.app.App = null;
    //preference repo = null

    constructor() {
        this.initFirebaseApp();
        //init preferenceRepo
    }

    initFirebaseApp() {
        this.firebaseApp == !firebase.app.length
            ? firebase.initializeApp(firebaseConfig)
            : firebase.app()
    }

}