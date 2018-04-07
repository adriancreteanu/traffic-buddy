import SuperService from "./SuperService";
import UserProfileModel from "../models/UserProfileModel";
import ApiErrorModel from "../models/error/ApiErrorModel";


export default class UserService extends SuperService {

    async fetchUserProfile(username: ?string) {
        var response: UserProfileModel | ApiErrorModel;
        await this.firebaseApp
            .database()
            .ref("users/TM")
            .child(username)
            .once("value")
            .then(snapshot => {
                let user = snapshot.val();
                if (user) {
                    response = new UserProfileModel(user);
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