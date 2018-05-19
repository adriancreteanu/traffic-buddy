

export default class ThreadModel {

    id: string;
    chatPartner: string;

    constructor(thread, key: string) {
        this.id = key;
        this.chatPartner = thread.chatPartner;
    }
}