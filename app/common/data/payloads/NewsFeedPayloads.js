
export type postGeneralMessagePayloadType = {
    username: ?string,
    rank: ?number,
    location: ?string,
    category: ?string,
    message: ?string, 
    date: ?Date,
    likes: ?number,
};

export function createPostGeneralMessagePayload(
    postDetails: postGeneralMessagePayloadType
): postGeneralMessagePayloadType {
    return {
        username: postDetails.username,
        rank: postDetails.rank, 
        location: postDetails.location,
        category: postDetails.category, 
        message: postDetails.message, 
        date: postDetails.date,
        likes: postDetails.likes,
    };
};
