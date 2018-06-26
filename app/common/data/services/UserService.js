import SuperService from "./SuperService";
import UserProfileModel from "../models/UserProfileModel";
import ApiErrorModel from "../models/error/ApiErrorModel";
import InputValidationHelper from "../../helpers/InputValidationHelper";

import * as userDataPayloads from "../../data/payloads/UserPayloads";

export default class UserService extends SuperService {

    async fetchUserProfile(username: ?string) {
        var response: UserProfileModel | ApiErrorModel;
        let location = InputValidationHelper.extractLocationFromUsername(username);

        await this.firebaseApp
            .database()
            .ref("users")
            .child(location)
            .child(username)
            .once("value")
            .then(snapshot => {
                let user = snapshot.val();
                if (user) {
                    response = new UserProfileModel(user, snapshot.key);
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
        return response;
    }

    async updateUserProfile(payload: userDataPayloads.userDataPayloadType) {
        var response: UserProfileModel | ApiErrorModel;
        let location = InputValidationHelper.extractLocationFromUsername(payload.username);

        await this.firebaseApp
            .database()
            .ref("users")
            .child(location)
            .child(payload.username)
            .update({
                car: {
                    brand: payload.brand,
                    model: payload.model,
                    fabricationYear: payload.fabricationYear,
                    engine: payload.engine,
                    doors: payload.doors,
                    fuel: payload.fuel,
                    horsepower: payload.horsepower,
                    coupeType: payload.coupeType
                }
            });


        await this.firebaseApp
            .database()
            .ref("users")
            .child(location)
            .child(payload.username)
            .once("value")
            .then(snapshot => {
                let user = snapshot.val();
                if (user) {
                    response = new UserProfileModel(user, snapshot.key);
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
        return response;
    }
}