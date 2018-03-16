import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import UserViewModel from "../../data/viewmodels/UserViewModel";

export function initialLoginState() {
    return {
        isInProgress: false, 
        errorViewModel: null, 
        viewModel: null
    };
}

export function initialSignOutState() {
    return {
        isInProgress: false, 
        isFinishedWithSuccess: false
    }
}

export interface LoginState {
    isInProgress: boolean,
    errorViewModel: ErrorViewModel,
    viewModel: UserViewModel
}

export interface SignOutState {
    isInProgress: boolean, 
    isFinishedWithSuccess: boolean
}