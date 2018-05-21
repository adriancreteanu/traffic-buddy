import React, { Component } from 'react';
import {
    View,
    BackHandler, 
    Platform
} from 'react-native';

import * as colors from "../styles/Colors";

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
import PostPage from '../pages/PostPage';
import ChatPage from '../pages/ChatPage';

import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilePage from '../pages/ProfilePage';
import SearchPage from '../pages/SearchPage';


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
    activeTintColor: '#000',
    
    inactiveTintColor: "#888",
    labelStyle: {
        fontSize: 12, 
    }, 
    style: {
        height: 48, 
    },
}

const tabBarOptionsAndroid = {

    labelStyle: {
        fontSize: 16
    },
    indicatorStyle: {
        backgroundColor: "#FFF"
    },
    style: {
        backgroundColor: 'rgba(51,102,136, 0.5)',
    }
}

export const MainNavigator = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: "News feed",
            tabBarIcon: <Icon
                name='car'
                size={20}
                color="#FA1"
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
                color="#FA1"
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
        tabBarOptions: Platform.OS == "ios" ? tabBarOptionsIOS :  tabBarOptionsAndroid
        
    }
);



export const AppNavigator = StackNavigator(
    {
        Main: {
            screen: MainNavigator,
        },
        Register: {
            screen: RegisterPage,
        },
        Settings: {
            screen: SettingsPage
        },
        Post: {
            screen: PostPage
        },
        Profile: {
            screen: ProfilePage
        },
        Chat: {
            screen: ChatPage
        },
        Search: {
            screen: SearchPage
        },
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
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