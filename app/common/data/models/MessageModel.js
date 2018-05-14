import MessageUserModel from "./MessageUserModel";
import DateHelper from "../../helpers/DateHelper";

export default class MessageModel {

    _id: string;
    text: string;
    createdAt: Date;
    user: MessageUserModel;

    constructor(firebaseMessage, key: string) {
        const message = firebaseMessage;

        this._id = key;
        this.text = message.text;
        this.createdAt = new Date(message.createdAt);
        this.user = new MessageUserModel(message.user);
    }

}