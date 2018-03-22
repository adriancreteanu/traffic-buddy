import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

// strings
import { strings } from "../common/localization/strings-repository";


class SettingsPage extends Component {

    static navigationOptions = {


        title: strings.settingsPageTitle,
        //headerStyle: { backgroundColor: '#a94242', borderWidth: 1, borderBottomColor: 'white' },
        headerStyle: {
            backgroundColor: '#4F6D7A',
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
            <View>
                <Text>SETTINGS</Text>
            </View>
        )
    }


}


export default SettingsPage;