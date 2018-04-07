import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import UserProfileViewModel from "../../data/viewmodels/UserProfileViewModel";

export function initialUserState() {
    return {
        isInProgress: false,
        errorViewModel: null, 
        viewModel: null
    };
}

export interface UserState {
    isInProgress: boolean, 
    errorViewModel: ErrorViewModel, 
    viewModel: UserProfileViewModel
}