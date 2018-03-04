import { authenticationActionTypes } from "../actions/AuthenticationActions";
import { initialSignOutState } from "../states/AuthenticationStates";

export const signOutReducer = (state = initialSignOutState(), action: any) => {
    switch (action.type) {
        case authenticationActionTypes.signOutInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                isFinishedWithSuccess: false,
            };

        case authenticationActionTypes.signOutFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                isFinishedWithSuccess: false,
            }
        case authenticationActionTypes.signOutSuccess:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                isFinishedWithSuccess: true,
            };
        default: 
            return initialSignOutState();
    }
}