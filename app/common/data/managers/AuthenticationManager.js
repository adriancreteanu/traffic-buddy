//imports
import * as authPayloads from "../payloads/AuthenticationPayloads";
import AuthenticationService from "../services/AuthenticationService";
import UserViewModel from "../viewmodels/UserViewModel";
import UserModel from "../models/UserModel";
import ErrorViewModel from "../viewmodels/error/ErrorViewModel";

export default class AuthenticationManger {

    _service: AuthenticationService;

    constructor() {
        this._service = new AuthenticationService();
    }

    async loginWithEmail(
        payload: authPayloads.loginCredentialsPayloadType
    ) : Promise<UserViewModel | ErrorViewModel> {
        let response = await this._service.loginWithEmail(payload);
        var viewModel = null;

        if(response instanceof UserModel) {
            viewModel = new UserViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }

    async verifyAuth(dispatch: any) {
        await this._service.verifyAuth(dispatch);
    }
}