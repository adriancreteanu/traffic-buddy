import { combineReducers } from 'redux';
import { navigationReducer } from "./NavigationReducer";
import { loginReducer } from "./LoginReducer";
import { signOutReducer } from "./SignOutReducer";
import { appReducer } from "./AppReducer";
import { registerReducer } from "./RegisterReducer";
import { postReducer } from "./PostReducer";
import { loggedUserReducer } from "./LoggedUserReducer";
import { userReducer } from "./UserReducer";
import { fetchPostsReducer } from "./FetchPostsReducer";
import { fetchMessagesReducer } from "./FetchMessagesReducer";
import { sendMessageReducer } from "./SendMessageReducer";

/*  TODO: maybe concatenate eg. fetchMessagesReducer & sendMessagesReducer into a single ChatReducer     
    where I treat all the cases
*/

export const RootReducer = combineReducers({
    navigationReducer: navigationReducer,
    loginReducer: loginReducer,
    signOutReducer: signOutReducer,
    appReducer: appReducer,
    registerReducer: registerReducer,
    postReducer: postReducer,
    loggedUserReducer: loggedUserReducer,
    userReducer: userReducer,
    fetchPostsReducer: fetchPostsReducer,
    fetchMessagesReducer: fetchMessagesReducer,
    sendMessageReducer: sendMessageReducer,
});