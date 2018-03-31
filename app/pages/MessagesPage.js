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
import NavLeftAddIcon from '../components/navigation/NavLeftAddIcon';

import * as navActions from "../common/redux/actions/NavigationActions";

class MessagesPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title="Messages" />,
        headerLeft:
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <NavLeftIcon icon="search" />
                <NavLeftAddIcon
                    onPress={() => {
                        navActions.navigateToPostPage()(navigation.dispatch);
                    }}
                />
            </View>,
        headerRight:
            <NavRightIcon
                icon="cog"
                onPress={() => {
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
            <Text>No messages found</Text>
        )
    }
}

export default MessagesPage;