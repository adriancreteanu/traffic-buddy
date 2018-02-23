import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import NewsFeedItem from './NewsFeedItem';


const mockNewsFeedItems = [
    {
        id: 1,
        username: "TM15ABI",
        rank: 14,
        category: "radar",
        message: "Atentie radar pe Take Ionescu", 
        hour: "13:55"
    }, {
        id: 2,
        username: "GJ22KJI",
        rank: -2,
        category: "accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "16:22"
    }, {
        id: 3,
        username: "AR12OPI",
        rank: 0,
        category: "trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "09:32"
    }, {
        id: 4,
        username: "TM15ABI",
        rank: 14,
        category: "radar",
        message: "Atentie radar pe Take Ionescu", 
        hour: "16:22"
    }, {
        id: 5,
        username: "GJ22KJI",
        rank: -2,
        category: "accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "05:12"
    }, {
        id: 6,
        username: "AR12OPI",
        rank: 0,
        category: "trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "00:12"
    }, {
        id: 6,
        username: "TM15ABI",
        rank: 14,
        category: "radar",
        message: "Atentie radar pe Take Ionescu",
        hour: "11:10"
    }, {
        id: 7,
        username: "GJ22KJI",
        rank: -2,
        category: "accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "19:45"
    }, {
        id: 8,
        username: "AR12OPI",
        rank: 0,
        category: "trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "06:42"
    }
]

class NewsFeedList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsFeedData: this._addKeysToItems(mockNewsFeedItems)
        };
    }

    _addKeysToItems = newsFeedItems => {
        return newsFeedItems.map(newsFeedItem => {
            return Object.assign(newsFeedItem, { key: newsFeedItem.id });
        });
    };

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
            <View style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    data={this.state.newsFeedData}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default NewsFeedList;