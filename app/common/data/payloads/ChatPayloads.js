export type fetchChatMessagesPayloadType = {
    loggedInUser: string,
    chatPartner: string,
};

export function createFetchChatMessagesPayloadType(
    chatUsers: fetchChatMessagesPayloadType
): fetchChatMessagesPayloadType {
    return {
        loggedInUser: chatUsers.loggedInUser,
        chatUsers: chatUsers.chatPartner
    };
};
