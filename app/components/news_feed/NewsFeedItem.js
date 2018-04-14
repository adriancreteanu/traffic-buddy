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

                    </View>
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

                <View style={{flex: 1, flexDirection: 'row'}}>
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


                    <View style={styles.userContainerStyle}>
                        <Text style={styles.usernameTextStyle}>{this.props.username}</Text>
                        <Text style={styles.defaultTextStyle}>Rank {this.props.rank}</Text>
                    </View>
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
        paddingRight: 20,
        borderBottomColor: "#222",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "column"
    },
    usernameTextStyle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'right'
    },
    defaultTextStyle: {
        color: "#666",
        fontSize: 16,
        textAlign: 'right'
    },

    userContainerStyle: {
        flex: 1, 
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 0,
        paddingLeft: 10,
        marginTop: 15, 
    },
    hourContainerStyle: {
        flex: 1,
        paddingRight: 10,
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
    },
    messageSectionStyle: {
        flex: 1,
        flexDirection: "column",
    },
    iconsSectionStyle: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 0,
        paddingLeft: 10,
        marginTop: 30
    },
    iconCountStyle: {
        paddingTop: 5,
        fontSize: 12,
    },
    likeIconStyle: {
        marginRight: 40,
        flexDirection: "row"
    }
});

export default NewsFeedItem;