import SuperService from "./SuperService";

import * as authPayloads from "../payloads/AuthenticationPayloads";

import UserModel from "../models/UserModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

import SplashScreen from 'react-native-splash-screen';

export default class AuthenticationService extends SuperService {

    async loginWithEmail(
        payload: authPayloads.loginCredentialsPayloadType
    ) {

        var response: UserModel | ApiErrorModel = null;

        await this.firebaseApp
            .auth()
            .signInWithEmailAndPassword(payload.username, payload.password)
            .then(user => {
                //save user is preferences
                response = new UserModel(user);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async verifyAuth(dispatch: any) {
         await this.firebaseApp
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    //do nothing for now
                } else {
                    navActions.navigateToLoginPage()(dispatch);
                }
                SplashScreen.hide();
            });
    }

    async signOut(): boolean{
        let response = false;
        await this.firebaseApp
            .auth()
            .signOut()
            .then(() => {
                response = true;
            })
            .catch();
            return response;
    }



}