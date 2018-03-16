import { combineReducers } from 'redux';
import { navigationReducer } from "./NavigationReducer";
import { loginReducer } from "./LoginReducer";
import { signOutReducer } from "./SignOutReducer";
import { appReducer } from "./AppReducer";

export const RootReducer = combineReducers({
    navigationReducer: navigationReducer, 
    loginReducer: loginReducer,
    signOutReducer: signOutReducer,
    appReducer: appReducer,
});