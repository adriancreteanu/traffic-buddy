import { userActionTypes } from "../actions/UserActions";
import { initialUserState } from "../states/UserStates";

export const loggedUserReducer = (state = initialUserState(), action: any) => {
    switch (action.type) {
        case userActionTypes.fetchLoggedUserInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case userActionTypes.fetchLoggedUserFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case userActionTypes.fetchLoggedUserSuccess:
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