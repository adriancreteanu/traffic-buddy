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

import { connect } from "react-redux";

import MessageItem from "../components/MessageItem";
import { Item } from 'native-base';

class MessagesPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={strings.messagesPageTitle} />,
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
            threads: []
        }
    }


    componentWillReceiveProps(nextProps) {
        let userReducer = nextProps.userReducer;

        if (userReducer && userReducer.viewModel) {
            let threads = userReducer.viewModel.userProfileViewModel.threads.threadsList;
            this.setState({
                threads: threads
            })
        }
    }


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
                            lastMessageHour={"22:34"}
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
        backgroundColor: "#FFF",
    }
});

function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(MessagesPage);