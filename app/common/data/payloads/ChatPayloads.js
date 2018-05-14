export type fetchChatMessagesPayloadType = {
    loggedInUser: string,
    chatPartner: string,
};

export type sendChatMessagePayloadType = {
    loggedInUser: string, 
    chatPartner: string,
    regionCode: string,
    message: string,
    createdAt: Date,
}

export function createFetchChatMessagesPayloadType(
    chatUsers: fetchChatMessagesPayloadType
): fetchChatMessagesPayloadType {
    return {
        loggedInUser: chatUsers.loggedInUser,
        chatUsers: chatUsers.chatPartner
    };
};


export function createSendChatMessagePayloadType(
    chatMessage: sendChatMessagePayloadType
): sendChatMessagePayloadType {
    return {
        loggedInUser: chatMessage.loggedInUser, 
        chatPartner: chatMessage.chatPartner, 
        regionCode: chatMessage.regionCode, 
        message: chatMessage.message, 
        createdAt: chatMessage.createdAt
    };
};