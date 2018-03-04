export default class UserModel {

    email: string;
    profileId: string;
    //id: string;

    constructor(firebaseObject, key) {
        const user = firebaseObject;
        //this.id = key;
        this.email = user.email;
        this.profileId = user.uid;
    }
}