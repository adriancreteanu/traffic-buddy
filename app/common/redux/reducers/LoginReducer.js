import { authenticationActionTypes } from "../actions/AuthenticationActions";
import { initialLoginState } from "../states/AuthenticationStates";

export const loginReducer = (state = initialLoginState(), action: any) => {
    switch (action.type) {
        case authenticationActionTypes.loginInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case authenticationActionTypes.loginFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case authenticationActionTypes.loginSuccess:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: null,
                viewModel: action.viewModel,
                isFinishedWithSuccess: true,
            };
        default:
            return state;
    }
}