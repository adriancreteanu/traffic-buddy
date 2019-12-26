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

import ChatService from "../common/data/services/ChatService";


class ChatPage extends Component {


    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={navigation.state.params.user} />,
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
            isNewConversation: false,
        }

        this.preferencesRepo = new PreferencesRepo();
        this.chatService = new ChatService();
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

    async componentWillReceiveProps(nextProps) {
        if (this.state.messages.length == 0) {
            this.setState({
                isNewConversation: true
            });
        }
    }

    async componentDidMount() {
        this.setState({
            loggedInUser: await this.preferencesRepo.getValue(PreferenceKeys.loggedInUsername),
            chatPartner: this.props.navigation.state.params.user,
        });

        await this.chatService.loadMessages(this.state.loggedInUser, this.state.chatPartner, async (message) => {
            await this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        });
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

    render() {
        return !this.props.fetchMessagesReducer.isInProgress ? (
            <GiftedChat
                messages={this.state.messages}
                renderBubble={this.renderBubble}
                renderAvatar={null}
                onSend={(message) => {
                    this.state.messages.length == 0 || this.state.isNewConversation ?
                        this.setState((previousState) => {
                            return {
                                isNewConversation: true,
                                messages: GiftedChat.append(previousState.messages, message)
                            };
                        }) : null;
                    this.chatService.sendMessage(message, this.state.loggedInUser, this.state.chatPartner)
                }}

                user={{
                    _id: this.state.loggedInUser,
                    name: this.state.loggedInUser,
                }}

            />
        ) :
            (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <CirclesLoader
                        size={60}
                        color={colors.General.appPrimary}
                        dotRadius={10}
                    />
                </View>
            );

    }
}


function mapStateToProps(state) {
    return {
        loggedUserReducer: state.loggedUserReducer,
        fetchMessagesReducer: state.fetchMessagesReducer
    };
}


export default connect(mapStateToProps)(ChatPage);
