import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class NewsFeedItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.defaultTextStyle}> {this.props.username} </Text>
                <Text style={styles.defaultTextStyle}> Rank: {this.props.rank} </Text>
                <Text style={styles.defaultTextStyle}> Category: {this.props.category} </Text>
                <View
                    style={{
                        flex: 1, 
                        borderBottomColor: '#a94242',
                        borderBottomWidth: 1,
                        marginTop: 10, 
                        marginBottom: 10,
                        marginRight: 10
                    }}
                />
                <Text style={styles.messageStyle}> {this.props.message} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#a94242',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 5,
        paddingLeft: 5,
    },
    defaultTextStyle: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    messageStyle: {
        flex: 1,
        //flexDirection: 'row',
        fontSize: 16,
        color: '#a94242',
        //backgroundColor: 'cyan',
        //alignSelf: 'flex-start',
        //textAlign: 'justify'

    }
});

export default NewsFeedItem;