import SuperService from "./SuperService";
import MessagesModel from "../models/MessagesModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as chatPayloads from "../payloads/ChatPayloads";
import MessageModel from "../models/MessageModel";


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
            .limitToLast(15)
            .once("value")
            .then(snapshot => {
                response = new MessagesModel(snapshot.val());
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });
        return response;
    }
    

    constructor(props) {
        super(props);
        this.messagesRef = null;
    }

     async loadMessages(callback) {
        this.messagesRef = this.firebaseApp.database().ref("messages/TM/TM15ABI/TM55WAR");
        this.messagesRef.off();

        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key, 
                text: message.text, 
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id, 
                    name: message.user.name
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

     async sendMessage(message) {
        for(let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text, 
                user: message[i].user, 
                createdAt: new Date().getTime()
            });
        }
    }
    
    async closeChat() {
        if(this.messagesRef) {
            this.messagesRef.off();
        }
    }

    async sendMessageOld(
        payload: chatPayloads.sendChatMessagePayloadType
    ) {
        var response: MessageModel | ApiErrorModel = null;

        await this.firebaseApp
            .database()
            .ref("messages")
            .child(payload.regionCode)
            .child(payload.loggedInUser)
            .child(payload.chatPartner)
            .push({
                createdAt: payload.createdAt,
                text: payload.message,
                user: {
                    _id: payload.loggedInUser,
                    name: payload.loggedInUser
                },
            })
            .then(() => {
                //response = new MessageModel(payload);
            })
            .catch(error => {
                response = ApiErrorModel.createDefaultErrorInstance(error);
            });

        return response;
    }




}