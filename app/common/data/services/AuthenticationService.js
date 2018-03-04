import SuperService from "./SuperService";

import * as authPayloads from "../payloads/AuthenticationPayloads";

import UserModel from "../models/UserModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

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
                response = new UserModel(user, user.key);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async verifyAuth() {
        await this.firebaseApp
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    //do nothing for now
                } else {
                    navActions.navigateToLoginPage()(dispatch);
                }
            });
    }



}