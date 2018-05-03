export default class PostModel {

    id: string;
    username: string;
    rank: number;
    location: string;
    category: string;
    message: string;
    date: Date; 
    hour: String;

    constructor(firebaseObject, key) {
        const postDetails = firebaseObject;
        this.id = key;
        this.username = postDetails.username;
        this.rank = postDetails.rank;
        this.category = postDetails.category;
        this.message = postDetails.message;
        /* Date saved in Firebase is a timestamp, so now we are converting it back to date. */
        this.date = new Date(postDetails.date);
        this.hour = this.date.getHours() + ":" + this.date.getMinutes();
    }
}