import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight, 
} from "react-native";

import * as colors from "../styles/Colors";

class MessageItem extends Component {

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onThreadPress}
                underlayColor={colors.General.appPrimaryTransparent}
            >
                <View style={styles.container}>
                    <Text style={styles.usernameStyle}>{this.props.chatPartner}</Text>
                    <Text style={styles.hourStyle}>{this.props.lastMessageHour}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.General.whiteColor,
        borderBottomColor: colors.General.appPrimary,
        borderBottomWidth: 1,
        padding: 20,
    },
    usernameStyle: {
        fontSize: 18,
    },
    hourStyle: {
        fontSize: 18,
    }
});

export default MessageItem;