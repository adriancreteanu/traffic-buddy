//imports
import * as authPayloads from "../payloads/AuthenticationPayloads";
import AuthenticationService from "../services/AuthenticationService";
import UserViewModel from "../viewmodels/UserViewModel";
import UserModel from "../models/UserModel";
import ErrorViewModel from "../viewmodels/error/ErrorViewModel";
import UserProfileModel from "../models/UserProfileModel";
import UserProfileViewModel from "../viewmodels/UserProfileViewModel";

export default class AuthenticationManager {

    _service: AuthenticationService;

    constructor() {
        this._service = new AuthenticationService();
    }

    async loginWithEmail(
        payload: authPayloads.loginCredentialsPayloadType
    ): Promise<UserProfileViewModel | ErrorViewModel> {
        let response = await this._service.fetchUserProfile(payload);
        var viewModel: UserProfileViewModel | ErrorViewModel = null;

        if (response instanceof UserModel) {
            viewModel = new UserProfileViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }

    async registerUser(
        payload: authPayloads.registerCredentialsPayloadType
    ): Promise<UserProfileModel | ErrorViewModel> {
        let response = await this._service.registerUser(payload);
        var viewModel: UserProfileViewModel | ErrorViewModel = null;

        if(response instanceof UserProfileModel) {
            viewModel = new UserProfileViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }

    async verifyAuth(dispatch: any) {
        this._service.verifyAuth(dispatch);
    }

    async signOut() {
        return response = await this._service.signOut();
    }
}