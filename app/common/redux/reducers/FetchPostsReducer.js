import { newsFeedActionTypes } from "../actions/NewsFeedActions";
import { initialFetchPostsState } from "../states/NewsFeedStates";

export const fetchPostsReducer = (state = initialFetchPostsState(), action: any) => {
    switch (action.type) {
        case newsFeedActionTypes.fetchInProgress:
            return {
                ...state,
                type: action.type,
                isInProgress: true,
                errorViewModel: null,
                viewModel: null,
                isFinishedWithSuccess: false,
            };

        case newsFeedActionTypes.fetchFailure:
            return {
                ...state,
                type: action.type,
                isInProgress: false,
                errorViewModel: action.errorViewModel,
                viewModel: null,
                isFinishedWithSuccess: false,
            }
        case newsFeedActionTypes.fetchSuccess:
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