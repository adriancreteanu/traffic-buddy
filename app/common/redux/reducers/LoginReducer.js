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
                viewModel: null
            };

        case authenticationActionTypes.loginFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null
            }
        case authenticationActionTypes.loginSuccess:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: null,
                viewModel: action.viewModel
            };
        default: 
            return initialLoginState();
    }
}