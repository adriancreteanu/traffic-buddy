import * as firebase from 'firebase';
import { firebaseConfig } from '../config/FirebaseConfig';
import PreferencesRepo from "../repos/PreferencesRepo";

export default class SuperService {

    firebaseApp: firebase.app.App = null;
    preferencesRepo: PreferencesRepo = null;

    constructor() {
        this.initFirebaseApp();
        this.preferencesRepo = new PreferencesRepo();
    }

    initFirebaseApp() {
        this.firebaseApp = !firebase.apps.length
            ? firebase.initializeApp(firebaseConfig)
            : firebase.app()
    }

}