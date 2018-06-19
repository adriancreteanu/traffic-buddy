

export default class ThreadModel {

    id: string;
    chatPartner: string;
    lastMessageTime: string;

    constructor(thread, key: string) {
        this.id = key;
        this.chatPartner = thread.chatPartner;
        this.lastMessageTime = thread.lastMessageTime;
    }
}