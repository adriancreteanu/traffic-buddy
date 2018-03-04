import UserModel from "../models/UserModel";


export default class UserViewModel {

    _viewModel: ?UserModel;

    constructor(model: UserModel) {
        this._viewModel = mode;
    }

    get userViewModel() {
        return this._viewModel;
    }
}