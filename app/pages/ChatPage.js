import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import NavRightIcon from '../components/navigation/NavRightIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';

import * as colors from "../styles/Colors";

import { connect } from 'react-redux';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';


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

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 132231,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                    },
                },
                {
                    _id: 121367,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                    },
                },
            ],
        })
    }

    renderBubble (props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: colors.General.appPrimary
              }
            }}
          />
        )
      }

      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                renderBubble={this.renderBubble}
                renderAvatar={null}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1
                }}
                
            />
        )
    }
}



function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    };
}


export default connect(mapStateToProps)(ChatPage);
