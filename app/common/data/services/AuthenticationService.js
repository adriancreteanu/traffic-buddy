import SuperService from "./SuperService";

import * as authPayloads from "../payloads/AuthenticationPayloads";

import UserModel from "../models/UserModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

import SplashScreen from 'react-native-splash-screen';
import UserProfileModel from "../models/UserProfileModel";

import { PreferenceKeys } from "../../constants/PreferenceKeys";
import firebase from "react-native-firebase";
import InputValidationHelper from "../../helpers/InputValidationHelper";

export default class AuthenticationService extends SuperService {

    async registerUser(payload: authPayloads.registerCredentialsPayloadType) {
        var response: UserProfileModel | ApiErrorModel = null;
        // Check if plate number is already used by another user
        let userAlreadyExists: UserProfileModel | ApiErrorModel = await this.checkIfUsernameExists(payload.plateNumber);

        if (userAlreadyExists instanceof ApiErrorModel) {
            response = userExists;
        } else if (userAlreadyExists instanceof UserProfileModel) {
            // TODO: Create error saying that plate already exists -> this won't compile yet
            // Example: 
            let error = {
                message: "User already exists",
                code: "13123123221"
            };
            response = ApiErrorModel.createDefaultErrorInstance(error);
        } else {
            await this.firebaseApp
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(async snapshot => {
                    // Write user data to firebase
                    let insertResponse: ApiErrorModel | bool = await this.insertUserDataInDatabase(payload);
                    if (insertResponse instanceof ApiErrorModel) {
                        response = insertResponse;
                    } else {
                        // User data successfully inserted into firebase
                        response = new UserProfileModel(payload);
                        // Save user data to preferences
                        this.saveUserDataInPreferences(
                            payload.plateNumber,
                            payload.email,
                            snapshot.uid
                        );
                    }
                })
                .catch(error => {
                    response = ApiErrorModel.createDefaultErrorInstance(error);
                });
        }
        return response;
    }

    async checkIfUsernameExists(plateNumber: ?string) {
        var response: boolean | ApiErrorModel;
        let location = InputValidationHelper.extractLocationFromUsername(plateNumber);
        await this.firebaseApp
            .database()
            .ref("users")
            .child(location)
            .child(plateNumber)
            .once("value")
            .then(snapshot => {
                let user = snapshot.val();
                if (user) {
                    response = new UserProfileModel(user);
                } else {
                    response = null;
                }
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async insertUserDataInDatabase(
        payload: authPayloads.registerCredentialsPayloadType
    ) {
        var response: bool | ApiErrorModel;
        await this.firebaseApp
            .database()
            .ref("users")
            .child(payload.location)
            .child(payload.plateNumber)
            .set({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                ranking: {
                    rank: 0,
                    likes: 0,
                    dislikes: 0
                },
                location: payload.location
            })
            .then(() => {
                console.log("Synchronization succeeded");
                response = true;
            })
            .catch(erorr => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async loginWithEmail(
        payload: authPayloads.loginCredentialsPayloadType
    ) {

        var response: UserModel | ApiErrorModel = null;

        await this.firebaseApp
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                //save user data in preferences
                this.saveUserDataInPreferences(
                    payload.username,
                    payload.email,
                    user.uid,
                );
                response = new UserModel(user);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    async saveUserDataInPreferences(username: string, email: string, uid: string, location: string) {
        await this.preferencesRepo.saveValue(PreferenceKeys.loggedInUsername, username);
        await this.preferencesRepo.saveValue(PreferenceKeys.loggedInEmail, email);
        await this.preferencesRepo.saveValue(PreferenceKeys.loggedInUID, uid);
        //await this.preferencesRepo.saveValue(PreferenceKeys.loggedInUserLocation, location)
    }

    async fetchUserProfile(
        payload: authPayloads.loginCredentialsPayloadType
    ) {
        var response: UserProfileModel | ApiErrorModel;
        let location = InputValidationHelper.extractLocationFromUsername(payload.username);
        await this.firebaseApp
            .database()
            .ref("users")
            .child(location)
            .child(payload.username)
            .once("value")
            .then(async snapshot => {
                let user = snapshot.val();
                if (user) {
                    //daca username exista in DB
                    let payloadEmailAndPassword = {
                        username: user.email,
                        password: payload.password
                    };
                    response = await this.loginWithEmail(payloadEmailAndPassword);
                } else {
                    let error = {
                        message: "User does not exist2as",
                        code: "123456789"
                    };
                    response = ApiErrorModel.createDefaultErrorInstance(error);
                }
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        let x = 2;
        return response;
    }

    async updateUserToken(username: string, location: string) {
        let FCM = firebase.messaging();
        let ref = this.firebaseApp.database().ref(`users/${location}/${username}`);

        FCM.requestPermission();
        FCM.getToken().then(token => {
            // stores the token in user's profile
            ref.update({ pushToken: token });
        });
    }

    async verifyAuth(dispatch: any) {
        await this.firebaseApp
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    // do nothing 
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
                this.preferencesRepo.deleteAllDataFromPreferences();
                response = true;
            })
            .catch();
        return response;
    }



}