import SuperService from "./SuperService";
import MessagesModel from "../models/MessagesModel";
import ApiErrorModel from "../models/error/ApiErrorModel";

import * as chatPayloads from "../payloads/ChatPayloads";
import MessageModel from "../models/MessageModel";
import InputValidationHelper from "../../helpers/InputValidationHelper";
import DateHelper from "../../helpers/DateHelper";


export default class ChatService extends SuperService {


    constructor(props) {
        super(props);
        this.messagesRef = null;
    }


    async fetchMessages(
        payload: chatPayloads.fetchChatMessagesPayloadType
    ) {
        var response: MessagesModel | ApiErrorModel = null;
        let location = InputValidationHelper.extractLocationFromUsername(payload.loggedInUser);
        await this.firebaseApp
            .database()
            .ref("messages")
            .child(location)
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

    async loadThreads(loggedUser: string, callback) {

        let location = InputValidationHelper.extractLocationFromUsername(loggedUser);
        this.messagesRef = this.firebaseApp.database().ref(`users/${location}/${loggedUser}/threads`);
        this.messagesRef.off();

        const onReceive = (data) => {
            const thread = data.val();
            callback({
                id: data.key,
                chatPartner: thread.chatPartner, 
                lastMessageTime: thread.lastMessageTime ? DateHelper.formatTime(new Date(thread.lastMessageTime)) : "",
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
        
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

        let user1Location = InputValidationHelper.extractLocationFromUsername(user1_id);
        let user2Location = InputValidationHelper.extractLocationFromUsername(user2_id);

        this.messagesRef = this.firebaseApp.database().ref("users");

        // Create new thread for users
        this.messagesRef
            .child(`${user1Location}/${user1_id}/threads/${threadKey}`)
            .set({
                chatPartner: user2_id
            });

        this.messagesRef
            .child(`${user2Location}/${user2_id}/threads/${threadKey}`)
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

        let location = InputValidationHelper.extractLocationFromUsername(loggedUser);
        this.messagesRef = this.firebaseApp.database().ref(`users/${location}`);

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

        if (!threadKey) {
            // Create new thread 
            threadKey = this.messagesRef.push().key;
            await this.createNewThread(threadKey, loggedUser, chatPartner);
        }

        // Create new message
        this.messagesRef = this.firebaseApp.database().ref(`threads/${threadKey}/messages`)

        let lastMessageTime = new Date().getTime();

        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: lastMessageTime
            });
        }

        // Update last message time for first user
        let loggedUserLocation = InputValidationHelper.extractLocationFromUsername(loggedUser);
        this.messagesRef = this.firebaseApp.database().ref(`users/${loggedUserLocation}/${loggedUser}/threads/${threadKey}`);
        await this.messagesRef.update({ lastMessageTime: lastMessageTime });

        // Update last message time for second user
        let chatPartnerLocation = InputValidationHelper.extractLocationFromUsername(chatPartner);
        this.messagesRef = this.firebaseApp.database().ref(`users/${chatPartnerLocation}/${chatPartner}/threads/${threadKey}`);
        await this.messagesRef.update({ lastMessageTime: lastMessageTime });        
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