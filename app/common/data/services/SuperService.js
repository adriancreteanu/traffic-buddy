import * as firebase from 'firebase';
import { firebaseConfig } from '../config/FirebaseConfig';

export default class SuperService {

    firebaseApp: firebase.app.App = null;
    //preference repo = null

    constructor() {
        this.initFirebaseApp();
        //init preferenceRepo
    }

    initFirebaseApp() {
        this.firebaseApp = !firebase.apps.length
            ? firebase.initializeApp(firebaseConfig)
            : firebase.app()
    }

}