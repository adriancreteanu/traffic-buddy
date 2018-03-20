import AuthenticationManager from "../../data/managers/AuthenticationManager";
import * as authPayloads from "../../data/payloads/AuthenticationPayloads";
import UserViewModel from "../../data/viewmodels/UserViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";

import * as navActions from "../actions/NavigationActions";
import UserProfileViewModel from "../../data/viewmodels/UserProfileViewModel";

export const authenticationActionTypes = {
    loginInProgress: "loginInProgress",
    loginSuccess: "loginSuccess",
    loginFailure: "loginFailure",
    signOutInProgress: "signOutInProgress",
    signOutSuccess: "signOutSuccess",
    signOutFailure: "signOutFailure",
    registerInProgress: "registerInProgress",
    registerSuccess: "registerSuccess",
    registerFailure: "registerFailure"
};

export function registerAction(
    payload: authPayloads.registerCredentialsPayloadType
) {
    return async function (dispatch: any) {
        let type = authenticationActionTypes.registerInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let authManager = new AuthenticationManager();
        let response = await authManager.registerUser(payload);
        handleRegisterResponse(dispatch, response);
    }
}



export function loginWithEmailAction(
    payload: authPayloads.loginCredentialsPayloadType
) {
    return async function (dispatch: any) {
        let type = authenticationActionTypes.loginInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let authManager = new AuthenticationManager();
        let response = await authManager.loginWithEmail(payload);
        handleLoginResponse(dispatch, response);
    }
}

export function verifyAuthAction() {
    return async function (dispatch: any) {
        let authManager = new AuthenticationManager();
        authManager.verifyAuth(dispatch);
    }
}

export function signOutAction() {
    return async function (dispatch: any) {
        let type = authenticationActionTypes.signOutInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let authManager = new AuthenticationManager();
        let response = await authManager.signOut();
        type = response ? authenticationActionTypes.signOutSuccess : authenticationActionTypes.signOutFailure;
        dispatchInProgressAction(dispatch, false, type);
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

function handleLoginResponse(
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

function handleRegisterResponse(
    dispatch: any,
    response: UserProfileViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof UserProfileViewModel) {
        action = {
            type: authenticationActionTypes.registerSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: authenticationActionTypes.registerFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}