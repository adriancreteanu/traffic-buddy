import ThreadsListModel from "./ThreadsListModel";
import RankingModel from "./RankingModel";
import CarModel from "./CarModel";

export default class UserProfileModel {

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    location: string;
    ranking: RankingModel;
    threads: ThreadsListModel;
    car: CarModel;
    


    constructor(firebaseObject, key: string) {
        const userProfile = firebaseObject;
        this.username = key;
        this.email = userProfile.email;
        this.firstName = userProfile.firstName;
        this.lastName = userProfile.lastName;
        this.location = userProfile.location;
        this.ranking = new RankingModel(userProfile.ranking);
        this.threads = new ThreadsListModel(userProfile.threads)
        this.car = typeof userProfile.car ==='undefined' ? null : new CarModel(userProfile.car);



    }
}