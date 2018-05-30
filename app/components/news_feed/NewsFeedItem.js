import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
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
                        borderBottomWidth: 1,
                        //borderBottomWidth: StyleSheet.hairlineWidth,
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
                                color={colors.General.appSecondary}
                                style={{
                                    marginRight: 5,
                                }}
                            />
                            <Text style={styles.iconCountStyle}>121</Text>
                        </View>
                        <Icon
                            name='comments'
                            size={25}
                            color={colors.General.appSecondaryTransparent}
                            style={{
                                marginRight: 5,
                            }}
                        />
                        <Text style={styles.iconCountStyle}>96</Text>
                    </View>


                    <TouchableHighlight
                        onPress={this.props.onUserPress}
                        underlayColor={"transparent"}
                        
                    >
                        <View style={styles.userContainerStyle}>
                            <Text style={styles.usernameTextStyle}>{this.props.username}</Text>
                            <Text style={styles.defaultTextStyle}>Rank {this.props.rank}</Text>
                        </View>
                    </TouchableHighlight>
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
        borderBottomColor: colors.General.appPrimaryTransparent,
        //borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 1, 
        flexDirection: "column",
        backgroundColor: colors.General.appPrimaryBackground,
        borderTopColor: colors.General.appPrimary,
    },
    usernameTextStyle: {
        flex: 1,
        color: colors.General.appSecondary,
        fontWeight: "bold",
        fontSize: 18,
        width: 100, 
        textAlign: 'center',
    },
    defaultTextStyle: {
        color: "#666",
        fontSize: 16,
    },

    userContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 10,
        paddingLeft: 15, 
        paddingRight: 10,
        marginTop: 15,
        borderBottomLeftRadius: 40,  // 40 to make it round
        borderTopLeftRadius: 40,
        backgroundColor: colors.General.whiteColorTransparent, 
        borderWidth: 2, 
        borderColor: colors.General.appSecondary
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