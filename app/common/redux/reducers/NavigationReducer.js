import { NavigationActions } from 'react-navigation';
import { AppNavigator } from "../../../container/AppContainer";
import { navigationActionTypes } from "../actions/NavigationActions";

//The initial page is Home page
//If the user is logged in, on app restart, navigation remains at home page
//Othewise, the app navigates to Login page
const homeAction = AppNavigator.router.getActionForPathAndParams('HomePage');
const tempNavState = AppNavigator.router.getStateForAction(homeAction);
const loginAction = AppNavigator.router.getActionForPathAndParams('LoginNavigator');
const initialNavigationState = AppNavigator.router.getStateForAction(
    loginAction,
    tempNavState
);

export const navigationReducer = (state: any = initialNavigationState, action: any) => {

    const defaultState = AppNavigator.router.getStateForAction(action, state);
    let nextState = defaultState;

    switch (action.type) {
        case navigationActionTypes.navigateToLoginPage:
            const getToLoginPageNavigator = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        key: "LoginNavigator",
                        routeName: "LoginNavigator"
                    })
                ]
            });
            nextState = AppNavigator.router.getStateForAction(getToLoginPageNavigator, state);
            break;
        case navigationActionTypes.navigateToRegisterPage:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "RegisterPage"
                }),
                state
            );
            break;
        default:
            break;
    }
    return nextState;

}