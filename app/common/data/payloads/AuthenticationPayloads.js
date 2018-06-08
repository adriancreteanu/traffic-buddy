
export type loginCredentialsPayloadType = {
    username: ?string,
    email: ?string,
    password: ?string,
};

export type registerCredentialsPayloadType = {
    plateNumber: ?string,
    firstName: ?string,
    lastName: ?string,
    email: ?string,
    password: ?string,
    ranking: {
        rank: number, 
        likes: number, 
        dislikes: number,
    }
};


//to delete 
export function createLoginCredentialsPayload(
    loginCredentials: loginCredentialsPayloadType
): loginCredentialsPayloadType {
    return {
        username: loginCredentials.username,
        password: loginCredentials.password
    };
};

export function createRegisterCredentialsPayload(
    registerCredentials: registerCredentialsPayloadType
): registerCredentialsPayloadType {
    return {
        plateNumber: registerCredentials.plateNumber,
        firstName: registerCredentials.firstName,
        lastName: registerCredentials.lastName,
        email: registerCredentials.email,
        password: registerCredentials.password, 
        ranking: registerCredentials.ranking,
    };
};