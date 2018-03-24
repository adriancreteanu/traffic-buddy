import UserProfileModel from "../models/UserProfileModel";


export default class UserProfileViewModel {

    _viewModel: ?UserProfileModel;

    constructor(model: UserProfileModel) {
        this._viewModel = model;
    }

    get userProfileViewModel() {
        return this._viewModel;
    }
}