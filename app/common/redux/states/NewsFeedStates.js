import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";


export function initialPostState() {
    return {
        isInProgress: false,
        errorViewModel: null, 
        viewModel: null
    };
}

export interface PostState {
    isInProgress: boolean, 
    errorViewModel: ErrorViewModel, 
    viewModel: PostViewModel
}