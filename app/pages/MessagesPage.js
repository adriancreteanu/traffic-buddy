//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native';

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

class MessagesPage extends Component {

    static navigationOptions = {
        headerTitle: <NavTitleUI title="Messages" />,
        headerLeft: <NavLeftIcon />,
        headerRight: <NavRightIcon />,
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
    }


    render() {
        return (
            <Text>No messages found</Text>
        )
    }
}

export default MessagesPage;