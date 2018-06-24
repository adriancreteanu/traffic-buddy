import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
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
        if (newsFeedItems) {
            return newsFeedItems.map(newsFeedItem => {
                return Object.assign(newsFeedItem, { key: newsFeedItem.id });
            });
        }
    }

    renderItem = ({ item }) => {
        return (
            <NewsFeedItem
                username={item.username}
                rank={item.rank}
                category={item.category}
                message={item.message}
                hour={item.hour}
                likes={item.likes}
            />
        );
    };

    renderFooter = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
                <FlatList
                    data={this.state.newsFeedData}
                    renderItem={this.renderItem}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.props.handleLoadMore}
                    onEndReachedThreshold={0}
                />
            </View>
        );
    }
}

export default NewsFeedList;