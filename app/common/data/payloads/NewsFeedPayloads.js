
export type postGeneralMessagePayloadType = {
    username: ?string,
    userRank: ?number,
    location: ?string,
    category: ?string,
    message: ?string, 
    date: ?Date,
};

export function createPostGeneralMessagePayload(
    postDetails: postGeneralMessagePayloadType
): postGeneralMessagePayloadType {
    return {
        username: postDetails.username,
        userRank: postDetails.userRank, 
        location: postDetails.location,
        category: postDetails.category, 
        message: postDetails.message, 
        date: postDetails.date,
    };
};
