import DateHelper from "../../helpers/DateHelper";

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
        let date = new Date(postDetails.date);
        this.date = DateHelper.formatDate(date);
        this.hour = DateHelper.formatTime(date);        
    }
}