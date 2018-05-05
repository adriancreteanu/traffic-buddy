
import * as newsFeedPayloads from "../../data/payloads/NewsFeedPayloads";
import NewsFeedManager from "../../data/managers/NewsFeedManager";
import PostViewModel from "../../data/viewmodels/PostViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";
import PostsViewModel from "../../data/viewmodels/PostsViewModel";


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
        let response = await newsFeedManager.fetchPosts(location);
        handleFetchResponse(dispatch, response);
    }
}

export function fetchMorePosts(
    location: string, 
    lastPostId: string
) {
    return async function(dispatch: any) {
        let type = newsFeedActionTypes.fetchInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let newsFeedManager = new NewsFeedManager();
        let response = await newsFeedManager.fetchMorePosts(location, lastPostId);
        handleFetchResponse(dispatch, response);
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

function handleFetchResponse(
    dispatch: any,
    response: PostsViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof PostsViewModel) {
        action = {
            type: newsFeedActionTypes.fetchSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: newsFeedActionTypes.fetchFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}