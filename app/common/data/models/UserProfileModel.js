import ThreadsListModel from "./ThreadsListModel";
import RankingModel from "./RankingModel";

export default class UserProfileModel {

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    ranking: RankingModel;
    threads: ThreadsListModel;


    constructor(firebaseObject, key: string) {
        const userProfile = firebaseObject;
        this.username = key;
        this.email = userProfile.email;
        this.firstName = userProfile.firstName;
        this.lastName = userProfile.lastName;
        this.ranking = new RankingModel(userProfile.ranking);
        this.threads = new ThreadsListModel(userProfile.threads);
    }
}