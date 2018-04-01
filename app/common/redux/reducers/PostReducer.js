import { newsFeedActionTypes } from "../actions/NewsFeedActions";
import { initialPostState } from "../states/NewsFeedStates";

export const postReducer = (state = initialPostState(), action: any) => {
    switch (action.type) {
        case newsFeedActionTypes.postInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case newsFeedActionTypes.postFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case newsFeedActionTypes.postSuccess:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: null,
                viewModel: action.viewModel,
                isFinishedWithSuccess: true,
            };
        default: 
            return initialPostState();
    }
}