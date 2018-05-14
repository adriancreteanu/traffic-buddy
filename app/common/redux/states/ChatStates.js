import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import MessagesViewModel from "../../data/viewmodels/MessagesViewModel";
import MessageViewModel from "../../data/viewmodels/MessageViewModel";


export function initialFetchMessagesState() {
    return {
        isInProgress: false,
        errorViewModel: null, 
        viewModel: null
    };
}

export function initialSendMessageState() {
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

export interface SendMessageState {
    isInProgress: boolean, 
    errorViewModel: ErrorViewModel, 
    viewModel: MessageViewModel
}