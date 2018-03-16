
export type loginCredentialsPayloadType = {
    username: ?string, 
    password: ?string,
};

export function createLoginCredentialsPayload(
    username: ?string, 
    password: ?string, 
) {
    return {
        username: username, 
        password: password
    };
};