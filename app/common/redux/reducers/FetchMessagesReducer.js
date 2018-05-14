import { chatActionTypes } from "../actions/ChatActions";
import { initialFetchMessagesState } from "../states/ChatStates";

export const fetchMessagesReducer = (state = initialFetchMessagesState(), action: any) => {
    switch (action.type) {
        case chatActionTypes.fetchInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case chatActionTypes.fetchFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case chatActionTypes.fetchSuccess:
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