import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

class MessageItem extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onThreadPress}
            >
                <View style={styles.container}>
                    <Text style={styles.usernameStyle}>{this.props.chatPartner}</Text>
                    <Text style={styles.hourStyle}>{this.props.lastMessageHour}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#F00",
        padding: 15,
    },
    usernameStyle: {
        fontSize: 18,
    },
    hourStyle: {
        fontSize: 18,
    }
});

export default MessageItem;