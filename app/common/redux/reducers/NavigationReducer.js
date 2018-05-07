import { NavigationActions } from 'react-navigation';
import { AppNavigator } from "../../../container/AppContainer";
import { navigationActionTypes } from "../actions/NavigationActions";
import { authenticationActionTypes } from '../actions/AuthenticationActions';
import { newsFeedActionTypes } from "../actions/NewsFeedActions";

//The initial page is Home page
//If the user is logged in, on app restart, navigation remains at home page
//Othewise, the app navigates to Login page


//Force a Init of the main router
let initialNavigationState = AppNavigator.router.getStateForAction(
    NavigationActions.init()
);

const firstAction = AppNavigator.router.getActionForPathAndParams("Main/Home");

//Then calculate the state with a navigate action to the first route, sending the previous initialized state as argument
// initialNavigationState = AppNavigator.router.getStateForAction(
//     firstAction,
//     initialNavigationState
// );

initialNavigationState = AppNavigator.router.getStateForAction(
    {}
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
        case authenticationActionTypes.registerSuccess:
        case newsFeedActionTypes.postSuccess:
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

        case navigationActionTypes.navigateToSettingsPage:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Settings"
                }),
                state
            );
            break;

        case navigationActionTypes.navigateToPostPage:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Post"
                }),
                state
            );
            break;

        case navigationActionTypes.navigateToProfilePage:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Profile", 
                    params: {
                        user: action.user
                    }
                }), 
                state
            );
            break;

        default:
            break;
    }
    return nextState;

}