import { NavigationActions } from 'react-navigation';
import * as authActions from "../actions/AuthenticationActions";

export const navigationActionTypes = {
    navigateToLoginPage: "navigateToLoginPage",
    navigateToHomePage: "navigateToHomePage",
    navigateToRegisterPage: "navigateToRegisterPage", 
    navigateToSettingsPage: "navigateToSettingsPage",
    navigateToPostPage: "navigateToPostPage",
    navigateToProfilePage: "navigateToProfilePage",
    navigateToChatPage: "navigateToChatPage",
};

export function navigateToLoginPage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToLoginPage
        };
        dispatch(action); 
    };
}

export function navigateToRegisterPage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToRegisterPage
        };
        dispatch(action); 
    };
}

export function navigateToSettingsPage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToSettingsPage
        };
        dispatch(action); 
    };
}

export function navigateToHomePage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToHomePage
        };
        dispatch(action); 
    };
}

export function navigateToProfilePage(user: Any) {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToProfilePage, 
            user: user
        };
        dispatch(action);
    };
}

export function navigateToPostPage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToPostPage
        };
        dispatch(action); 
    };
}

export function navigateToChatPage(user: Any) {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToChatPage, 
            user: user
        };
        dispatch(action);
    }
}

export function initialNavigation() {
    return async function(dispatch: any) {
        dispatch(authActions.verifyAuthAction());
    }
}

export function navigateBack() {
    return function(dispatch: any) {
        let action = NavigationActions.back();
        dispatch(action);
    };
}

export function resetStack() {
    return function(dispatch: any) {
        let action = {
            type: "none"
        };
        dispatch(action);
    };
}