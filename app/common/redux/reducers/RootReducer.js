import { combineReducers } from 'redux';
import { navigationReducer } from "./NavigationReducer";

export const RootReducer = combineReducers({
    navigationReducer: navigationReducer
});