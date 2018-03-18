import SuperService from "./SuperService";

import * as authPayloads from "../payloads/AuthenticationPayloads";

import UserModel from "../models/UserModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

import SplashScreen from 'react-native-splash-screen';

export default class AuthenticationService extends SuperService {

    async registerUser(payload: authPayloads.registerCredentialsPayloadType) {

        // TODO: Create UserProfileModel
        var response: ApiErrorModel = null;

        // Check if plate number is already used by another user
        //let userExists = await this.verifyIfPlateExists(payload.plateNumber);

        await this.firebaseApp
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                //write data to firebase
                console.log(user);
                this.insertUserDataInDatabase(payload);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async verifyIfPlateExists(plateNumber: ?string) {
        var plateAlreadyExists: bool;
        await this.firebaseApp
            .database()
            .ref("users")
            .once("value")
            .then(snapshot => {
                plateAlreadyExists = snapshot.hasChild(plateNumber);
            })
            .catch(error => {
                return ApiErrorModel.createDefaultErrorInstance(error);
            });

        return plateAlreadyExists;
    }

    async insertUserDataInDatabase(
        payload: authPayloads.registerCredentialsPayloadType
    ) {
        await this.firebaseApp
            .database()
            .ref("users")
            .child(payload.plateNumber)
            .set({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName
            })
            .then(() => {
                console.log("Synchronization succeeded");
            })
            .catch(erorr => {
                return ApiErrorModel.createDefaultErrorInstance(error);
            })
    }

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

    async signOut(): boolean {
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