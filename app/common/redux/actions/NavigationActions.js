import { NavigationActions } from 'react-navigation';

export const navigationActionTypes = {
    navigateToLoginPage: "navigateToLoginPage",
    navigateToHomePage: "navigateToHomePage",
    navigateToRegisterPage: "navigateToRegisterPage"
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

export function navigateToHomePage() {
    return function(dispatch: any) {
        let action = {
            type: navigationActionTypes.navigateToHomePage
        };
        dispatch(action); 
    };
}

export function navigateBack() {
    return function(dispatch: any) {
        let action = NavigationActions.back();
        dispatch(action);
    };
}