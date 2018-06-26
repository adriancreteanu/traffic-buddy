//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftAddIcon from '../components/navigation/NavLeftAddIcon';

import * as navActions from "../common/redux/actions/NavigationActions";

import { strings } from "../common/localization/strings-repository";

import * as colors from "../styles/Colors";

import { connect } from "react-redux";

import MessageItem from "../components/MessageItem";
import ChatService from '../common/data/services/ChatService';
import ThreadModel from '../common/data/models/ThreadModel';
import PreferencesRepo from '../common/data/repos/PreferencesRepo';
import { PreferenceKeys } from '../common/constants/PreferenceKeys';

class MessagesPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={strings.messagesPageTitle.toUpperCase()} />,
        headerLeft:
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <NavLeftIcon
                    icon="search"
                    onPress={() => {
                        navActions.navigateToSearchPage()(navigation.dispatch);
                    }}
                />
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
            loggedUser: "",
            threads: []
        }

        this.chatService = new ChatService();
        this.preferencesRepo = new PreferencesRepo();
    }

    async componentDidMount() {

        /* Fetch logged user username from storage */
        this.setState({
            loggedUser: await this.preferencesRepo.getValue(PreferenceKeys.loggedInUsername)
        });

        /* Load all threads for logged user */
        if (this.state.loggedUser) {
            await this.chatService.loadThreads(this.state.loggedUser, (thread) => {
                this.setState({
                    threads: [...this.state.threads, new ThreadModel(thread, thread.id)]
                });
            });
        }

    }


    // componentWillReceiveProps(nextProps) {
    //     let loggedUserReducer = nextProps.loggedUserReducer;

    //     if (loggedUserReducer && loggedUserReducer.viewModel) {
    //         let threads = loggedUserReducer.viewModel.userProfileViewModel.threads.threadsList;
    //         this.setState({
    //             threads: threads
    //         })
    //     }
    // }


    navigateToChatPage(chatPartner: string) {
        navActions.navigateToChatPage(chatPartner)(this.props.dispatch);
    }


    render() {
        return this.state.threads.length != 0 ? (
            <View style={styles.container}>
                <FlatList
                    data={this.state.threads}
                    renderItem={({ item }) => (
                        <MessageItem
                            chatPartner={item.chatPartner}
                            lastMessageTime={item.lastMessageTime}
                            onThreadPress={() => this.navigateToChatPage(item.chatPartner)}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        ) : <View />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.General.appPrimaryBackground,
    }
});

function mapStateToProps(state) {
    return {
        loggedUserReducer: state.loggedUserReducer
    }
}

export default connect(mapStateToProps)(MessagesPage);