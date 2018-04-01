import SuperService from "./SuperService";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

import * as newsFeedPayloads from "../payloads/NewsFeedPayloads";
import PostModel from "../models/PostModel";
import DateHelper from "../../helpers/DateHelper";



export default class NewsFeedService extends SuperService {


    async postGeneralMessage(
        payload: newsFeedPayloads.postGeneralMessagePayloadType
    ) {
        var response;
        await this.firebaseApp
            .database()
            .ref("feed")
            .child(payload.location)
            .push({
                username: payload.username,
                rank: payload.userRank,
                category: payload.category,
                message: payload.message,
                date: payload.date
            })
            .then(() => {
                response = new PostModel(payload);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });

        return response;
    }
}