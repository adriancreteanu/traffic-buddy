import SuperService from "./SuperService";
import MessagesModel from "../models/MessagesModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as chatPayloads from "../payloads/ChatPayloads";
import MessageModel from "../models/MessageModel";


export default class ChatService extends SuperService {


    constructor(props) {
        super(props);
        this.messagesRef = null;
    }


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




    // TODO: What to send when there are no messages?
    async loadMessages(loggedUser: string, chatPartner: string, callback) {

        // Check if thread exists first
        let threadKey = await this.checkIfThreadExists(loggedUser, chatPartner);

        if (threadKey) {
            this.messagesRef = this.firebaseApp.database().ref(`threads/${threadKey}/messages`);
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
    }


    async createNewThread(threadKey: string, user1_id: string, user2_id: string) {

        this.messagesRef = this.firebaseApp.database().ref("users");

        // Create new thread for users
        this.messagesRef
            .child(`TM/${user1_id}/threads/${threadKey}`)
            .set({
                chatPartner: user2_id
            });

        this.messagesRef
            .child(`TM/${user2_id}/threads/${threadKey}`)
            .set({
                chatPartner: user1_id
            });

        // Add new thread key in threads list
        this.messagesRef = this.firebaseApp.database().ref("threads");
        this.messagesRef
            .child(`${threadKey}/participants`)
            .set({
                '0': user1_id,
                '1': user2_id
            });
    }

    async checkIfThreadExists(loggedUser: string, chatPartner: string) {
        this.messagesRef = this.firebaseApp.database().ref("users/TM");

        let threadId: string = null;

        await this.messagesRef
            .child(`${loggedUser}/threads`)
            .orderByChild("chatPartner")
            .equalTo(chatPartner)
            .once('value')
            .then(snapshot => {
                snapshot.forEach(function (data) {
                    threadId = data.key;
                });
            })
            .catch(error => {
                threadId = ApiErrorModel.createDefaultErrorInstance(error);
            });

        return threadId;
    }

    async sendMessage(message, loggedUser: string, chatPartner: string) {


        // Check if thread exists first
        let threadKey = await this.checkIfThreadExists(loggedUser, chatPartner);

        let x = threadKey;

        let y = 2;


        if (!threadKey) {
            // Create new thread 
            let yyy = 55;
            threadKey = this.messagesRef.push().key;
            await this.createNewThread(threadKey, loggedUser, chatPartner);
        }

        let z = 99;

        // Create new message
        this.messagesRef = this.firebaseApp.database().ref(`threads/${threadKey}/messages`)

        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: new Date().getTime()
            });
        }
    }

    async closeChat() {
        if (this.messagesRef) {
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