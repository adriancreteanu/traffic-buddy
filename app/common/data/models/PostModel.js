export default class PostModel {

    username: ?string;
    userRank: ?number;
    location: ?string;
    category: ?string;
    message: ?string;
    date: ?Date

    constructor(firebaseObject) {
        const postDetails = firebaseObject;
        this.username = postDetails.username;
        this.userRank = postDetails.userRank;
        //this.location = postDetails.location;
        this.category = postDetails.category;
        this.message = postDetails.message;
        /* Date saved in Firebase is a timestamp, so now we are converting it back to date. */
        this.date = new Date(postDetails.date);
    }
}