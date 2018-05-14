import SuperService from "./SuperService";
import MessagesModel from "../models/MessagesModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as chatPayloads from "../payloads/ChatPayloads";


export default class ChatService extends SuperService {

    async fetchMessages(
        payload: chatPayloads.fetchChatMessagesPayloadType
    ) {
        var response: MessagesModel | ApiErrorModel = null;

        await this.firebaseApp
            .database()
            .ref("messages")
            .child("TM")
            .child(payload.loggedInUser)
            .child(payload.chatPartner)
            .limitToLast(5)
            .once("value")
            .then(snapshot => {
                response = new MessagesModel(snapshot.val());
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }

    


}