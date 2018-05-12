import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import NavRightIcon from '../components/navigation/NavRightIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';

import { connect } from 'react-redux';


class ChatPage extends Component {


    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={navigation.state.params.user.username} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: '#FA1',
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
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}



function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    };
}


export default connect(mapStateToProps)(ChatPage);
