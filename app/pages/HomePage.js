//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import DateHelper from "../common/helpers/DateHelper";

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

//components
import NextFeedList from '../components/news_feed/NewsFeedList';

//Authentication
import * as authActions from "../common/redux/actions/AuthenticationActions";

//Navigation 
import { connect } from 'react-redux';
import * as navActions from "../common/redux/actions/NavigationActions";
import * as userActions from "../common/redux/actions/UserActions";
import * as newsFeedActions from "../common/redux/actions/NewsFeedActions";
import NavLeftAddIcon from '../components/navigation/NavLeftAddIcon';

import Icon from 'react-native-vector-icons/FontAwesome';
import PreferencesRepo from '../common/data/repos/PreferencesRepo';
import { PreferenceKeys } from '../common/constants/PreferenceKeys';

import { List, SearchBar } from 'react-native-elements';
import NewsFeedItem from '../components/news_feed/NewsFeedItem';

// spinner
import { LinesLoader } from 'react-native-indicator';


const mockNewsFeedItems = [
    {
        id: 1,
        username: "TM15ABI",
        rank: 14,
        category: "Radar",
        message: "Atentie Radar pe Take Ionescu",
        hour: "13:55"
    }, {
        id: 2,
        username: "GJ22KJI",
        rank: -2,
        category: "Accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "16:22"
    }, {
        id: 3,
        username: "AR12OPI",
        rank: 0,
        category: "Trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "09:32"
    }, {
        id: 4,
        username: "TM15ABI",
        rank: 14,
        category: "Radar",
        message: "Atentie Radar pe Take Ionescu acesta este un mesaj foarte lung asda ad adsnasd asdnasjdas asdnajsdna asdnajdasnd saadsdjnajdnasj andjsandajsnd saanjsnqwnqwnenasd lireajsdsandas najdnjasndjandajn nasjdnasasdas najsdnajsnd andasjnsnasjdnajndasj",
        hour: "16:22"
    }, {
        id: 5,
        username: "GJ22KJI",
        rank: -2,
        category: "Accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "05:12"
    }, {
        id: 6,
        username: "AR12OPI",
        rank: 0,
        category: "Trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "00:12"
    }, {
        id: 7,
        username: "TM15ABI",
        rank: 14,
        category: "Radar",
        message: "Atentie Radar pe Take Ionescu",
        hour: "11:10"
    }, {
        id: 8,
        username: "GJ22KJI",
        rank: -2,
        category: "Accident",
        message: "Accident la iesire din oras pe Calea Lugojului. Se merge bara la bara",
        hour: "19:45"
    }, {
        id: 9,
        username: "AR12OPI",
        rank: 0,
        category: "Trafic",
        message: "Trafic infernal pe strada Paris. Ocoliti zona daca aveti drum pe aici",
        hour: "06:42"
    }
]


class HomePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        //title: DateHelper.generateCurrentDate(),
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()} />,
        headerLeft:
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <NavLeftIcon icon="search" />
                <NavLeftAddIcon
                    onPress={() => {
                        navActions.navigateToPostPage()(navigation.dispatch);
                    }}
                />
            </View>,
        headerRight:
            <NavRightIcon
                icon="cog"
                onPress={() => {
                    //authActions.signOutAction()(navigation.dispatch);
                    navActions.navigateToSettingsPage()(navigation.dispatch);
                }}
            />,
        headerStyle: {
            backgroundColor: '#c6bf69',
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: '#FFF',
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: '#FFF'
    });

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            uid: "",
            lastPostId: "",
            posts: [], 
            postsHaveEnded: false
        };
        this.preferencesRepo = new PreferencesRepo();
    }


    componentWillReceiveProps(nextProps) {
        //let userProfile = nextProps.userReducer;

        //let postsReducer = nextProps.fetchPostsReducer;
        //let posts = null;   
    }

    saveInitialPostsToState = () => {
        let postsReducer = this.props.fetchPostsReducer;
        if (postsReducer && postsReducer.viewModel) {
            posts = postsReducer.viewModel.postsViewModel.postsModel;

            if (posts) {
                this.setState({
                    ...this.state,
                    //posts: [...this.state.posts, ...newPosts], 
                    posts: [...this.state.posts, ...posts],
                    lastPostId: posts[posts.length - 1].id
                })
            }
        }
    }

    async componentDidMount() {
        // Get user info (email, plate number and uid) from preferences
        await this.getDataFromPreferences();

        if (this.state.username) {
            userActions.fetchUserProfile(this.state.username)(this.props.dispatch);
            await newsFeedActions.fetchPosts("Timis")(this.props.dispatch);

            this.saveInitialPostsToState();
        }
    }

    async getDataFromPreferences() {
        this.setState({
            ...this.state,
            username: await this.preferencesRepo.getValue(PreferenceKeys.loggedInUsername),
            email: await this.preferencesRepo.getValue(PreferenceKeys.loggedInEmail),
            uid: await this.preferencesRepo.getValue(PreferenceKeys.loggedInUID),
        });
    }

    async handleLoadMore() {

        let x = 2;


        if(!this.state.postsHaveEnded) {
        await newsFeedActions.fetchMorePosts("Timis", this.state.lastPostId)(this.props.dispatch);

        let newPosts = this.props.fetchPostsReducer.viewModel.postsViewModel.postsModel;


        this.setState({
            postsHaveEnded: newPosts.length < 5 ? true : false,
            posts: [...this.state.posts, ...newPosts],
            lastPostId: newPosts[newPosts.length - 1].id
        });

    }

        let y = 2;
    }



    renderFooter = () => {
        if (this.state.postsHaveEnded) return null;

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
        );
    };



    render() {


        let x = 2;


        return this.state.posts.length != 0 ? (
            <View style={{
                backgroundColor: "#FFF",
                flex: 1
            }}>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => (
                        <NewsFeedItem
                            username={item.username}
                            rank={item.rank}
                            category={item.category}
                            message={item.message}
                            hour={item.hour}
                        />
                    )}
                    keyExtractor={item => item.id}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0}
                />
            </View>
        ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LinesLoader
                        color='rgba(169, 20, 20, 0.9)'
                        barHeight={80}
                        barWidth={8}
                        betweenSpace={7}
                    />
                </View>
            );
    }

}

function mapStateToProps(state) {
    return {
        navigationReducer: state.navigationReducer,
        userReducer: state.userReducer,
        fetchPostsReducer: state.fetchPostsReducer,
    };
}

export default connect(mapStateToProps)(HomePage);