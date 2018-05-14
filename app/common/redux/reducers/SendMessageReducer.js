import { chatActionTypes } from "../actions/ChatActions";
import { initialSendMessageState } from "../states/ChatStates";

export const sendMessageReducer = (state = initialSendMessageState(), action: any) => {
    switch (action.type) {
        case chatActionTypes.sendInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case chatActionTypes.sendFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case chatActionTypes.sendSuccess:
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