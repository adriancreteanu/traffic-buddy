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
    likes: number;

    constructor(firebaseObject, key) {
        const postDetails = firebaseObject;
        this.id = key;
        this.username = postDetails.username;
        this.rank = postDetails.rank;
        this.category = postDetails.category;
        this.message = postDetails.message;

        if(typeof postDetails.likes !== "undefined" || postDetails.likes != null) {
            this.likes = postDetails.likes;
        } else {
            this.likes = 0;
        }
        
        
        /* Date saved in Firebase is a timestamp, so now we are converting it back to date. */
        let date = new Date(postDetails.date);
        this.date = DateHelper.formatDate(date);
        this.hour = DateHelper.formatTime(date);        
    }
}