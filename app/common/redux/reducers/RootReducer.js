import { combineReducers } from 'redux';
import { navigationReducer } from "./NavigationReducer";
import { loginReducer } from "./LoginReducer";
import { signOutReducer } from "./SignOutReducer";
import { appReducer } from "./AppReducer";
import { registerReducer } from "./RegisterReducer";
import { postReducer } from "./PostReducer";

export const RootReducer = combineReducers({
    navigationReducer: navigationReducer, 
    loginReducer: loginReducer,
    signOutReducer: signOutReducer,
    appReducer: appReducer,
    registerReducer: registerReducer,
    postReducer: postReducer,
});