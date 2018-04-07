import UserManager from "../../data/managers/UserManager";
import UserProfileViewModel from "../../data/viewmodels/UserProfileViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";

export const userActionTypes = {
    fetchUserInProgress: "fetchUserInProgress", 
    fetchUserSuccess: "fetchUserSuccess",
    fetchUserFailure: "fetchUserFailure"
}

export function fetchUserProfile(username: ?string) {
    return async function(dispatch: any) {
        let type = userActionTypes.fetchUserInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let userManager = new UserManager();
        let response = await userManager.fetchUserProfile(username);
        handleResponse(dispatch, response);
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

function handleResponse(
    dispatch: any,
    response: UserProfileViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof UserProfileViewModel) {
        action = {
            type: userActionTypes.fetchUserSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: userActionTypes.fetchUserFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}