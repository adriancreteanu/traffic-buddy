import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';

class NewsFeedItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.userContainerStyle}>
                        <Text style={styles.usernameTextStyle}>{this.props.username}</Text>
                        <Text style={styles.defaultTextStyle}>Rank {this.props.rank}</Text>
                    </View>
                    <View style={styles.hourContainerStyle}>
                        <Text style={styles.hourTextStyle}> {this.props.hour} </Text>
                    </View>
                </View>

                <View style={styles.messageSectionStyle}>
                    <Text style={styles.messageCategoryStyle}>{this.props.category}</Text>
                    <Text style={styles.messageStyle}>{this.props.message}</Text>
                </View>

                <View style={styles.iconsSectionStyle}>
                    <View style={styles.likeIconStyle}>
                        <Icon
                            name='thumbs-up'
                            size={20}
                            color="#000"
                            style={{
                                marginRight: 5,
                            }}
                        />
                        <Text style={styles.iconCountStyle}>121</Text>
                    </View>
                    <Icon
                        name='comments'
                        size={20}
                        color="#000"
                        style={{
                            marginRight: 5,
                        }}
                    />
                    <Text style={styles.iconCountStyle}>96</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 0,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "column"
    },
    usernameTextStyle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,

    },
    defaultTextStyle: {
        color: "#666",
        fontSize: 16
    },

    userContainerStyle: {
        flex: 1,
        // backgroundColor: 'red'
        //textAlign: 'left'
    },
    hourContainerStyle: {
        flex: 1,
        //textAlign: 'right'
        // backgroundColor: 'cyan', 
        paddingRight: 10,
    },
    hourTextStyle: {
        textAlign: 'right',
        //marginTop: 10, 
        fontSize: 20,
        color: '#000'
    },
    messageStyle: {
        fontSize: 16,
        color: "#555"
    },
    messageCategoryStyle: {
        color: "#333",
        fontSize: 16, 
    },
    messageSectionStyle: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
    },
    iconsSectionStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 0,
        paddingLeft: 10,
        marginTop: 15
    },
    iconCountStyle: {
        paddingTop: 5,
        fontSize: 12,
        //paddingLeft: 5
    },
    likeIconStyle: {
        marginRight: 40,
        flexDirection: "row"
    }
});

export default NewsFeedItem;