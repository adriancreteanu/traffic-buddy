import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import NewsFeedItem from './NewsFeedItem';



class NewsFeedList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsFeedData: this.addKeysToItems(this.props.newsFeedItems)
        };
    }

    addKeysToItems(newsFeedItems: NewsFeedItem[]) {
        if(newsFeedItems) {
            return newsFeedItems.map(newsFeedItem => {
                return Object.assign(newsFeedItem, { key: newsFeedItem.id });
            });
        }
    }

    _renderItem = ({ item }) => {
        return (
            <NewsFeedItem
                username={item.username}
                rank={item.rank}
                category={item.category}
                message={item.message}
                hour={item.hour}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
                <FlatList
                    data={this.state.newsFeedData}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default NewsFeedList;