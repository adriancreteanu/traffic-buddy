

export default class MessageUserModel {
    _id: string;
    name: string;
    //avatar: string;

    constructor(messageUser) {
        this._id = messageUser._id;
        this.name = messageUser.name;

        /** 
         * Not sure if I need avatar for now
         */
        //this.avatar = messageUser.avatar;
    }
}