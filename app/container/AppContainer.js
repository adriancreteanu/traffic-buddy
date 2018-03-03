import React, { Component } from 'react';
import {
    View, 
    BackHandler
} from 'react-native';

//Navigation
import {
    StackNavigator,
    addNavigationHelpers
} from 'react-navigation';
import * as navActions from "../common/redux/actions/NavigationActions";

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
        headerMode: "none",
        mode: "modal"
    }
);

export const AppNavigator = StackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: stackNavigationOptions
        },
        RegisterPage: {
            screen: RegisterPage,
            navigationOptions: stackNavigationOptions
        },
        LoginNavigator: {
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
        initialRouteName: "HomePage",
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
    navigationReducer: state.navigationReducer
});

export default connect(mapStateToProps)(AppContainer);