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
import * as chatActions from "../common/redux/actions/ChatActions";

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import PreferencesRepo from "../common/data/repos/PreferencesRepo";
import { PreferenceKeys } from '../common/constants/PreferenceKeys';

import * as chatPayloads from "../common/data/payloads/ChatPayloads";

import { LinesLoader } from 'react-native-indicator';


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
            messages: [],
            loggedInUser: "",
            chatPartner: "",
            lastMessageId: "",
        }

        this.preferencesRepo = new PreferencesRepo();
    }

    componentWillMount() {
        // this.setState({
        //     messages: [
        //         {
        //             _id: 132231,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: "TM15ABI",
        //                 name: 'React Native',
        //             },
        //         },
        //         {
        //             _id: 121367,
        //             text: 'Hello bai',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //             },
        //         },
        //     ],
        // })
    }

    saveInitialMessagesToState = () => {
        let messagesReducer = this.props.fetchMessagesReducer;

        if (messagesReducer && messagesReducer.viewModel) {
            let messages = messagesReducer.viewModel.messagesViewModel.messagesModel;

            if (messages) {
                this.setState({
                    ...this.state,
                    messages: messages,
                    lastMessageId: messages[0].id
                })
            }

        }
    }

    async componentDidMount() {

        this.setState({
            loggedInUser: await this.preferencesRepo.getValue(PreferenceKeys.loggedInUsername),
        });

        let payload: chatPayloads.fetchChatMessagesPayloadType = {
            loggedInUser: this.state.loggedInUser,
            chatPartner: this.props.navigation.state.params.user.username
        };

        await chatActions.fetchMessages(payload)(this.props.dispatch);
        this.saveInitialMessagesToState();
    }

    renderBubble(props) {
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

        let payload: chatPayloads.sendChatMessagePayloadType = {
            loggedInUser: this.state.loggedInUser,
            chatPartner: this.props.navigation.state.params.user.username,
            regionCode: "TM", 
            message: messages[0].text, 
            createdAt: messages[0].createdAt.getTime()
        };

        chatActions.sendMessage(payload)(this.props.dispatch);
    }

    render() {
        return this.state.messages.length != 0 ? (
            <GiftedChat
                messages={this.state.messages}
                renderBubble={this.renderBubble}
                renderAvatar={null}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.state.loggedInUser
                }}

            />
        ) :
            (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LinesLoader
                        //color='rgba(169, 20, 20, 0.9)'
                        color='#FA1'
                        barHeight={65}
                        barWidth={6}
                        betweenSpace={7}
                    />
                </View>
            );

    }
}



function mapStateToProps(state) {
    return {
        userReducer: state.userReducer,
        fetchMessagesReducer: state.fetchMessagesReducer
    };
}


export default connect(mapStateToProps)(ChatPage);
