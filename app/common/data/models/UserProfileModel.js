import ThreadsListModel from "./ThreadsListModel";

export default class UserProfileModel {

    email: ?string;
    firstName: ?string;
    lastName: ?string;
    rank: ?number;
    threads: ThreadsListModel;


    constructor(firebaseObject) {
        const userProfile = firebaseObject;
        this.email = userProfile.email;
        this.firstName = userProfile.firstName;
        this.lastName = userProfile.lastName;
        this.rank = userProfile.rank;
        this.threads = new ThreadsListModel(userProfile.threads);
    }
}