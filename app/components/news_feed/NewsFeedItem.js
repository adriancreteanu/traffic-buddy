import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import * as colors from "../../styles/Colors";

import Icon from 'react-native-vector-icons/FontAwesome';

class NewsFeedItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={styles.hourContainerStyle}>
                        <Text style={styles.hourTextStyle}> {this.props.hour} </Text>
                    </View>
                </View>

                <View style={styles.messageSectionStyle}>

                    <View style={{
                        borderBottomColor: "#bbb",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        //marginRight: '60%',
                        alignSelf: 'flex-start'

                    }}>

                        <Text style={styles.messageCategoryStyle}>{this.props.category}</Text>

                    </View>
                    <Text style={styles.messageStyle}>{this.props.message}</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.iconsSectionStyle}>
                        <View style={styles.likeIconStyle}>
                            <Icon
                                name='thumbs-up'
                                size={25}
                                color={colors.General.appGradientPrimary}
                                style={{
                                    marginRight: 5,
                                }}
                            />
                            <Text style={styles.iconCountStyle}>121</Text>
                        </View>
                        <Icon
                            name='comments'
                            size={25}
                            color={colors.General.appGradientPrimary}
                            style={{
                                marginRight: 5,
                            }}
                        />
                        <Text style={styles.iconCountStyle}>96</Text>
                    </View>


                    <TouchableOpacity
                        onPress={this.props.onUserPress}
                        
                    >
                        <View style={styles.userContainerStyle}>
                            <Text style={styles.usernameTextStyle}>{this.props.username}</Text>
                            <Text style={styles.defaultTextStyle}>Rank {this.props.rank}</Text>
                        </View>
                    </TouchableOpacity>
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
        borderBottomColor: colors.General.appPrimary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        borderTopColor: colors.General.appPrimary,
    },
    usernameTextStyle: {
        color: colors.General.appPrimary,
        fontWeight: "bold",
        fontSize: 18,
        //textAlign: 'right', 
        width: 80
    },
    defaultTextStyle: {
        color: "#666",
        fontSize: 16,
        textAlign: 'right'
    },

    userContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingLeft: 25, 
        paddingRight: 20,
        marginTop: 15,
        borderBottomLeftRadius: 40, 
        borderTopLeftRadius: 40,
        backgroundColor: colors.General.whiteColor
    },
    hourContainerStyle: {
        flex: 1,
        paddingRight: 30,
    },
    hourTextStyle: {
        textAlign: 'right',
        fontSize: 20,
        color: '#000'
    },
    messageStyle: {
        marginTop: 10,
        fontSize: 16,
        color: "#555"
    },
    messageCategoryStyle: {
        color: "#333",
        fontSize: 18,
        marginBottom: 2,
        paddingRight: 20,
    },
    messageSectionStyle: {
        flex: 1,
        flexDirection: "column",
        paddingRight: 20,
    },
    iconsSectionStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 0,
        paddingLeft: 10,
        marginTop: 35
    },
    iconCountStyle: {
        paddingTop: 8,
        fontSize: 14,
    },
    likeIconStyle: {
        marginRight: 40,
        flexDirection: "row"
    }
});

export default NewsFeedItem;