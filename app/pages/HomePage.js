//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native';
import DateHelper from "../common/helpers/DateHelper";

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

//components
import NextFeedList from '../components/news_feed/NewsFeedList';

//Authentication
import * as authActions from "../common/redux/actions/AuthenticationActions";

//Navigation 
import { connect } from 'react-redux';
import * as navActions from "../common/redux/actions/NavigationActions";
import NavLeftAddIcon from '../components/navigation/NavLeftAddIcon';

import Icon from 'react-native-vector-icons/FontAwesome';

class HomePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        //title: DateHelper.generateCurrentDate(),
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()} />,
        headerLeft:
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <NavLeftIcon />
                <NavLeftAddIcon />
            </View>,
        headerRight:
            <NavRightIcon
                onPress={() => {
                    //authActions.signOutAction()(navigation.dispatch);
                    navActions.navigateToSettingsPage()(navigation.dispatch);
                }}
            />,
        headerStyle: {
            backgroundColor: '#c6bf69',
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: '#FFF',
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: '#FFF'
    });

    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: '#FFF'
            }}>
                <NextFeedList />
            </ScrollView>
        )
    }


}

function mapStateToProps(state) {
    return {
        navigationReducer: state.navigationReducer
    };
}

export default connect(mapStateToProps)(HomePage);