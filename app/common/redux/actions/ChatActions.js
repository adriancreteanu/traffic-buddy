import ChatManager from "../../data/managers/ChatManager";
import MessagesViewModel from "../../data/viewmodels/MessagesViewModel";
import ErrorViewModel from "../../data/viewmodels/error/ErrorViewModel";

import * as chatPayloads from "../../data/payloads/ChatPayloads";
import MessageViewModel from "../../data/viewmodels/MessageViewModel";


export const chatActionTypes = {
    fetchInProgress: "fetchInProgress",
    fetchSuccess: "fetchSuccess",
    fetchFailure: "fetchFailure",
    sendInProgress: "sendInProgress",
    sendSuccess: "sendSuccess",
    sendFailure: "sendFailure"
};

export function fetchMessages(
    payload: chatPayloads.fetchChatMessagesPayloadType
) {
    return async function (dispatch: any) {
        let type = chatActionTypes.fetchInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let chatManager = new ChatManager();
        let response = await chatManager.fetchMessages(payload);
        handleFetchResponse(dispatch, response);
    }
}

export function sendMessage(
    payload: chatPayloads.sendChatMessagePayloadType
) {
    return async function (dispatch: any) {
        let type = chatActionTypes.sendInProgress;
        dispatchInProgressAction(dispatch, true, type);
        let chatManager = new ChatManager();
        let response = await chatManager.sendMessage(payload);
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

function handleFetchResponse(
    dispatch: any,
    response: MessagesViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof MessagesViewModel) {
        action = {
            type: chatActionTypes.fetchSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: chatActionTypes.fetchFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}


function handleSendResponse(
    dispatch: any,
    response: MessageViewModel | ErrorViewModel
) {
    let action = null;
    if (response instanceof MessageViewModel) {
        action = {
            type: chatActionTypes.sendSuccess,
            isInProgress: false,
            errorViewModel: null,
            viewModel: response,
            isFinishedWithSuccess: true
        };
        dispatch(action);
    } else if (response instanceof ErrorViewModel) {
        action = {
            type: chatActionTypes.sendFailure,
            isInProgress: false,
            errorViewModel: response,
            viewModel: null,
            isFinishedWithSuccess: false,
        };
        dispatch(action);
    }
}