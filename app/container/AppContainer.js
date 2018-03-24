import React, { Component } from 'react';
import {
    View,
    BackHandler
} from 'react-native';

//Navigation
import {
    StackNavigator,
    TabNavigator,
    addNavigationHelpers
} from 'react-navigation';
import * as navActions from "../common/redux/actions/NavigationActions";
import * as authActions from "../common/redux/actions/AuthenticationActions";

//Redux
import { connect } from 'react-redux';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

//pages
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import MessagesPage from '../pages/MessagesPage';
import SettingsPage from '../pages/SettingsPage';

import Icon from 'react-native-vector-icons/FontAwesome';


let stackNavigationOptions = {
    statusBarStyle: "dark-content",
    headerTintColor: "black",
    headerStyle: {
        shadowOpacity: 0,
        shadowOffset: {
            height: 0
        },
        shadowRadius: 0,
        borderBottomWidth: 0,
        elevation: 0,
        //backgroundColor: "red",
        //paddingTop: 25,
        //height: 70
    }
};

export const LoginNavigator = StackNavigator(
    {
        LoginPage: {
            screen: LoginPage
        }
    },
    {
        initialRouteName: "LoginPage",
        headerMode: "none",
        mode: "modal"
    }
);

const tabBarOptionsIOS = {
    activeTintColor: "#a94242", 
    inactiveTintColor: "#000",
    labelStyle: {
        fontSize: 12, 
    }, 
    style: {
        height: 48
    },
}

export const MainNavigator = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: "News feed",
            tabBarIcon: <Icon
                name='car'
                size={20}
                color="#455A64"
            />
        }
    }, 
    Messages: {
        screen: MessagesPage,
        navigationOptions: {
            tabBarLabel: "Messages",
            tabBarIcon: <Icon
                name='envelope'
                size={20}
                color="#455A64"
            />
        }
    }
}, 
    {
        initialRouteName: "Home", 
        swipeEnabled: true, 
        animationEnabled: true, 
        lazy: true, 
        backBehavior: "none", 
        tabBarOptions: tabBarOptionsIOS
        
    }
);



export const AppNavigator = StackNavigator(
    {
        Main: {
            screen: MainNavigator,
            //navigationOptions: stackNavigationOptions
        },
        Register: {
            screen: RegisterPage,
            //navigationOptions: stackNavigationOptions
        },
        Settings: {
            screen: SettingsPage
        },
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                // backgroundColor: "transparent",
                // height: 0,
                // statusBarStyle: "light-content",
                // backgroundColor: "red",
                // headerMode: "none",
                // mode: "card"
                header: null
            }
        }
    },
    {
        initialRouteName: "Main",
        headerMode: "float"
    }
);

export const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.navigationReducer,
);
const addListener = createReduxBoundAddListener("root");

class AppContainer extends Component {

    componentDidMount() {
        this.loadAndroidBackButtonSupport();
        //navActions.initialNavigation()(this.props.dispatch);
        authActions.verifyAuthAction()(this.props.dispatch);
        
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress");
    }

    loadAndroidBackButtonSupport() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.onAndroidBackButtonPressed.bind(this)
        );
    }

    onAndroidBackButtonPressed() {
        if (this.shouldCloseApp()) {
            return false;
        } else {
            navActions.navigateBack()(this.props.dispatch);
            return true;
        }
    }

    shouldCloseApp() {
        return false;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppNavigator
                    navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.navigationReducer,
                        addListener
                    })}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    navigationReducer: state.navigationReducer,
    appReducer: state.appReducer,
});

export default connect(mapStateToProps)(AppContainer);