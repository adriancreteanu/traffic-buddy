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

class HomePage extends Component {

    static navigationOptions = ({navigation}) => ({
        //title: DateHelper.generateCurrentDate(),
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()} />,
        headerLeft: <NavLeftIcon />,
        headerRight:
             <NavRightIcon 
                onPress={() => {
                    authActions.signOutAction()(navigation.dispatch);
                }}
             />
    });

    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center", 
                backgroundColor: '#455A64'
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