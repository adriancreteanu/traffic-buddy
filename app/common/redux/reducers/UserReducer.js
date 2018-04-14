import { userActionTypes } from "../actions/UserActions";
import { initialUserState } from "../states/UserStates";

export const userReducer = (state = initialUserState(), action: any) => {
    switch (action.type) {
        case userActionTypes.fetchUserInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case userActionTypes.fetchUserFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case userActionTypes.fetchUserSuccess:
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