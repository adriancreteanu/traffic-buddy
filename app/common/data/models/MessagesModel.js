import MessageModel from "./MessageModel";


export default class MessagesModel {

    messagesModel: MessageModel[];

    constructor(firebaseMessages) {
        const messages = firebaseMessages;

        this.messagesModel = [];

        for(currentMessage in messages) {
            let message = new MessageModel(messages[currentMessage], currentMessage);
            this.messagesModel.push(message);
        }

        this.messagesModel.reverse();
    }


}