import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import UserViewModel from "../../data/viewmodels/UserViewModel";
import UserProfileViewModel from "../../data/viewmodels/UserProfileViewModel";

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

export function initialRegisterState() {
    return {
        isInProgress: false,
        errorViewModel: null,
        viewModel: null
    };
}

export interface LoginState {
    isInProgress: boolean,
    errorViewModel: ErrorViewModel,
    viewModel: UserViewModel
}

export interface RegisterState {
    isInProgress: boolean,
    errorViewModel: ErrorViewModel,
    viewModel: UserProfileViewModel
}

export interface SignOutState {
    isInProgress: boolean,
    isFinishedWithSuccess: boolean
}

