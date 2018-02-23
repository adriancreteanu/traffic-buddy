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

class HomePage extends Component {

    static navigationOptions = {
        //title: DateHelper.generateCurrentDate(),
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()} />,
        headerLeft: <NavLeftIcon />,
        headerRight: <NavRightIcon />
    }


    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center", 
                backgroundColor: '#a94242'
            }}>
                <NextFeedList />
            </ScrollView>
        )
    }
}

export default HomePage;