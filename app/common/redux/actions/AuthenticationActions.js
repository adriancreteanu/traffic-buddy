import AuthenticationManager from "../../data/managers/AuthenticationManager";
import * as authPayloads from "../../data/payloads/AuthenticationPayloads";
import UserViewModel from "../../data/viewmodels/UserViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";

import * as navActions from "../actions/NavigationActions";

export const authenticationActionTypes = {
    loginInProgress: "loginInProgress",
    loginSuccess: "loginSuccess",
    loginFailure: "loginFailure"
};


export function loginWithEmailAction(
    payload: authPayloads.loginCredentialsPayloadType
) {
    return async function (dispatch: any) {
        let type = authenticationActionTypes.loginInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let authManager = new AuthenticationManager();
        let response = await authManager.loginWithEmail(payload);
        handleAuthenticationResponse(dispatch, response);
    }
}

export function verifyAuthAction() {
    return async function (dispatch: any) {
        let authManager = new AuthenticationManager();
        await authManager.verifyAuth(dispatch);
    }
}



///INTERNAL FUNCTIONS

function dispatchInProgressAction(
    dispatch: any,
    isInProgress: boolean,
    type: string
) {
    let action = {
        isInProgress: isInProgress,
        type: type
    };
    dispatch(action);
}

function handleAuthenticationResponse(
    dispatch: any,
    response: UserViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof UserViewModel) {
        action = {
            type: authenticationActionTypes.loginSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
        navActions.resetStack()(dispatch);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: authenticationActionTypes.loginFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}