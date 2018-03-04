import { combineReducers } from 'redux';
import { navigationReducer } from "./NavigationReducer";
import { loginReducer } from "./LoginReducer";

export const RootReducer = combineReducers({
    navigationReducer: navigationReducer
});