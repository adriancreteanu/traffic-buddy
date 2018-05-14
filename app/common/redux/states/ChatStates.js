import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import MessagesViewModel from "../../data/viewmodels/MessagesViewModel";


export function initialFetchMessagesState() {
    return {
        isInProgress: false,
        errorViewModel: null, 
        viewModel: null
    };
}

export interface FetchMessagesState {
    isInProgress: boolean, 
    errorViewModel: ErrorViewModel, 
    viewModel: MessagesViewModel
}