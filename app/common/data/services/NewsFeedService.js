import SuperService from "./SuperService";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as navActions from "../../redux/actions/NavigationActions";

import * as newsFeedPayloads from "../payloads/NewsFeedPayloads";
import PostModel from "../models/PostModel";
import DateHelper from "../../helpers/DateHelper";
import PostsModel from "../models/PostsModel";



export default class NewsFeedService extends SuperService {


    async postGeneralMessage(
        payload: newsFeedPayloads.postGeneralMessagePayloadType
    ) {
        var response: PostModel | ApiErrorModel;
        await this.firebaseApp
            .database()
            .ref("feed")
            .child(payload.location)
            .push({
                username: payload.username,
                rank: payload.rank,
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

    async fetchPosts(
        location: string
    ) {
        var response: PostModel[] | ApiErrorModel;

        await this.firebaseApp
            .database()
            .ref("feed")
            .child(location)
            .limitToLast(10)
            .once("value")
            .then(snapshot => {
                response = new PostsModel(snapshot.val());
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });

        return response;
    }

    async fetchMorePosts(
        location: string,
        lastPostId: string
    ) {
        var response: PostModel[] | ApiErrorModel;

        let x = 2;

        await this.firebaseApp
            .database()
            .ref("feed")
            .child(location)
            .endAt(null, lastPostId)
            .limitToLast(10)
            .once("value")
            .then(snapshot => {
                response = new PostsModel(snapshot.val());
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            })

        return response;
    }

}