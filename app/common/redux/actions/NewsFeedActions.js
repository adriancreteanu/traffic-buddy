
import * as newsFeedPayloads from "../../data/payloads/NewsFeedPayloads";
import NewsFeedManager from "../../data/managers/NewsFeedManager";
import PostViewModel from "../../data/viewmodels/PostViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";


export const newsFeedActionTypes = {
    postInProgress: "postInProgress", 
    postSuccess: "postSuccess", 
    postFailure: "postFailure", 
    fetchInProgress: "fetchInProgress", 
    fetchSuccess: "fetchSuccess", 
    fetchFailure: "fetchFailure"
};

export function postAction(
    payload: newsFeedPayloads.postGeneralMessagePayloadType
) {
    return async function (dispatch: any) {
        let type = newsFeedActionTypes.postInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let newsFeedManager = new NewsFeedManager();
        let response = await newsFeedManager.postGeneralMessage(payload);
        handlePostResponse(dispatch, response);
    }
}

export function fetchPosts(
    location: string
) {
    return async function(dispatch: any) {
        let type = newsFeedActionTypes.fetchInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let newsFeedManager = new NewsFeedManager();
        let response = newsFeedManager.fetchPosts(location);
        handlePostResponse(dispatch, response);
    }
}


// INTERNAL FUNCTIONS

function dispatchInProgressAction(
    dispatch: any,
    isInProgress: boolean,
    type: string
) {
    let action = {
        isInProgress: isInProgress,
        type: type
    };
    dispatch(action);
}

function handlePostResponse(
    dispatch: any,
    response: PostViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof PostViewModel) {
        action = {
            type: newsFeedActionTypes.postSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: newsFeedActionTypes.postFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}