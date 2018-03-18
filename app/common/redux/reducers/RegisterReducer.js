import { authenticationActionTypes } from "../actions/AuthenticationActions";
import { initialRegisterState } from "../states/AuthenticationStates";

export const registerReducer = (state = initialRegisterState(), action: any) => {
    switch (action.type) {
        case authenticationActionTypes.registerInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case authenticationActionTypes.registerFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case authenticationActionTypes.registerSuccess:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: null,
                viewModel: action.viewModel,
                isFinishedWithSuccess: true,
            };
        default: 
            return initialRegisterState();
    }
}