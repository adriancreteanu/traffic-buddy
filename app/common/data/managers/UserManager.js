import UserProfileViewModel from "../viewmodels/UserProfileViewModel";
import ErrorViewModel from "../viewmodels/error/ErrorViewModel";
import UserService from "../services/UserService";
import UserProfileModel from "../models/UserProfileModel";

import * as userDataPayloads from "../../data/payloads/UserPayloads";


export default class UserManager {

    _service: UserService;

    constructor() {
        this._service = new UserService();
    }

    async fetchUserProfile(
        username: ?string
    ): Promise<UserProfileViewModel | ErrorViewModel> {
        let response = await this._service.fetchUserProfile(username);
        var viewModel: UserProfileViewModel | ErrorViewModel = null;

        if (response instanceof UserProfileModel) {
            viewModel = new UserProfileViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }

    async updateUserProfile(
        payload: userDataPayloads.userDataPayloadType
    ): Promise<UserProfileViewModel | ErrorViewModel> {
        let response = await this._service.updateUserProfile(payload);
        var viewModel: UserProfileViewModel | ErrorViewModel = null;

        if (response instanceof UserProfileModel) {
            viewModel = new UserProfileViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }
}