export default class UserProfileModel {

    email: ?string;
    firstName: ?string;
    lastName: ?string;
    rank: ?number;

    constructor(firebaseObject) {
        const userProfile = firebaseObject;
        this.email = userProfile.email;
        this.firstName = userProfile.firstName;
        this.lastName = userProfile.lastName;
        this.rank = userProfile.rank;
    }
}