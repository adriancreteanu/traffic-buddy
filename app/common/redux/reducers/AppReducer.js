
import { initialAppState, AppState } from "../states/AppStates";
import { authenticationActionTypes } from "../actions/AuthenticationActions";


export const appReducer = (state: AppState = initialAppState(), action: any) => {

    let nextState = state;

    switch(action.type) {

        /* Sign out actions */
        case authenticationActionTypes.signOutInProgress: 
            nextState = {
                ...state, 
                isInProgress: true
            };
            return nextState;
            break;
        case authenticationActionTypes.signOutSuccess: 
        case authenticationActionTypes.signOutFailure: 
            nextState = {
                ...state, 
                isInProgress: false
            };
            return nextState;
            break;
        default: 
            return state;
            break;
    }
}