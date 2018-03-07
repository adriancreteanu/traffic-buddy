import { NavigationActions } from 'react-navigation';
import { AppNavigator } from "../../../container/AppContainer";
import { navigationActionTypes } from "../actions/NavigationActions";
import { authenticationActionTypes } from '../actions/AuthenticationActions';

//The initial page is Home page
//If the user is logged in, on app restart, navigation remains at home page
//Othewise, the app navigates to Login page
const initialNavigationState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Home')
);

export const navigationReducer = (state: any = initialNavigationState, action: any) => {

    const defaultState = AppNavigator.router.getStateForAction(action, state);
    let nextState = defaultState;

    switch (action.type) {
        case navigationActionTypes.navigateToLoginPage:
            const getToLoginPageNavigator = NavigationActions.reset({
                index: 0,
                key: null, //the root navigator will reset
                actions: [
                    NavigationActions.navigate({
                        routeName: "Login"
                    })
                ]
            });
            nextState = AppNavigator.router.getStateForAction(getToLoginPageNavigator, state);
            break;

        case authenticationActionTypes.loginSuccess: 
            nextState = AppNavigator.router.getStateForAction(action, initialNavigationState);
            break;

        case navigationActionTypes.navigateToHomePage:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({
                routeName: "Home"
            }),
            state
        );
        break;

        case navigationActionTypes.navigateToRegisterPage:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Register"
                }),
                state
            );
            break;
        default:
            break;
    }
    return nextState;

}