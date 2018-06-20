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
import { CirclesLoader } from 'react-native-indicator';
import PostModel from '../common/data/models/PostModel';

import * as colors from '../styles/Colors';
import PostsModel from '../common/data/models/PostsModel';
import InputValidationHelper from '../common/helpers/InputValidationHelper';

class HomePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()} />,
        headerLeft:
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <NavLeftIcon
                    icon="search"
                    onPress={() => {
                        navActions.navigateToSearchPage()(navigation.dispatch);
                    }}
                />
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
            backgroundColor: "#FA1",
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
            postsHaveEnded: false,
            refreshing: false,
            location: "",
        };
        this.preferencesRepo = new PreferencesRepo();
    }


    async componentWillReceiveProps(nextProps) {
        let postReducer = nextProps.postReducer;
        let loginReducer = nextProps.loginReducer;

        // Refresh Home after sending a Post
        if (postReducer.viewModel) {
            nextProps.postReducer.viewModel = null;
            this.handleRefresh()
        }

        // Refresh Home after login
        if (loginReducer.viewModel) {
            nextProps.loginReducer.viewModel = null;
            await this.getDataFromPreferences();
            await this.setState({
                // Sustache - dupa login, va calcula locatia dupa usename, nu dupa ce are user-ul
                // Dar la handleRefresh, isi va da refresh pagina si va fi ok.
                //location: InputValidationHelper.extractLocationFromUsername(this.state.username)
                location: "TM",
            });
            this.handleRefresh();
        }
    }

    saveInitialPostsToState = () => {
        let postsReducer = this.props.fetchPostsReducer;
        if (postsReducer && postsReducer.viewModel) {
            let posts: PostsModel[] = postsReducer.viewModel.postsViewModel.postsModel;

            let numberOfPosts = posts.length;
            let lastPostId = "";
            let postsHaveEnded = false;

            if (numberOfPosts > 0) {
                // Get the last post id, indifferent of how many posts we have, but at least one
                lastPostId = posts[numberOfPosts - 1].id;
            }


            if (posts.length != 11) {
                // End of the list so we don't fetch anymore
                postsHaveEnded = true
            } else {
                // Remove the 11'th item from list (the one used just for the next fetch)
                posts.pop();
            }

            if (posts) {
                this.setState({
                    ...this.state,
                    posts: posts,
                    lastPostId: lastPostId,
                    refreshing: false,
                    postsHaveEnded: postsHaveEnded,
                })
            }
        }
    }

    async componentDidMount() {
        // Get user info (email, plate number and uid) from preferences
        await this.getDataFromPreferences();

        if (this.state.username) {
            await userActions.fetchLoggedUserProfile(this.state.username)(this.props.dispatch);

            if (this.props.loggedUserReducer.viewModel) {
                let location = this.props.loggedUserReducer.viewModel.userProfileViewModel.location;

                await this.setState({
                    location: location
                });

                // Update user token at users/user_original_location/username
                authActions.updateUserToken(this.state.username, InputValidationHelper.extractLocationFromUsername(this.state.username))(this.props.dispatch);
                await newsFeedActions.fetchPosts("TM")(this.props.dispatch);
                this.saveInitialPostsToState();
            }
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

    async handleRefresh() {

        this.setState({
            refreshing: true,
            postsHaveEnded: false,
            posts: [],
            lastPostId: ""
        });

        await newsFeedActions.fetchPosts("TM")(this.props.dispatch);
        this.saveInitialPostsToState();
    }

    async handleLoadMore() {
        if (!this.state.postsHaveEnded) {
            await newsFeedActions.fetchMorePosts("TM", this.state.lastPostId)(this.props.dispatch);

            let newPosts = this.props.fetchPostsReducer.viewModel.postsViewModel.postsModel;

            let numberOfPosts = newPosts.length;
            let lastPostId = "";
            let postsHaveEnded = false;

            if (numberOfPosts > 0) {
                // Get the last post id, indifferent of how many posts we have, but at least one
                lastPostId = newPosts[numberOfPosts - 1].id;
            }


            if (newPosts.length != 11) {
                // End of the list so we don't fetch anymore
                postsHaveEnded = true
            } else {
                // Remove the 11'th item from list (the one used just for the next fetch)
                newPosts.pop();
            }

            this.setState({
                postsHaveEnded: postsHaveEnded,
                posts: [...this.state.posts, ...newPosts],
                lastPostId: lastPostId
            });
        }
    }



    renderFooter = () => {
        if (this.state.postsHaveEnded) return null;

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingVertical: 70,
                    borderTopWidth: 1,
                    borderColor: colors.General.appPrimary,
                    backgroundColor: colors.General.appPrimaryBackground,
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    onUserPressed = (item) => {
        alert("User: " + item.username);
    }

    navigateToProfilePage(post: PostModel) {
        navActions.navigateToProfilePage(post)(this.props.dispatch);
    }

    render() {
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
                            onUserPress={() => this.navigateToProfilePage(item)}
                        />

                    )}

                    keyExtractor={item => item.id}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={1}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={this.state.refreshing}
                />
            </View>
        ) : (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.General.appPrimaryBackground,
                }}>
                    <CirclesLoader 
                        size={60}
                        color={colors.General.appPrimary}
                        dotRadius={10}
                    />
                </View>
            );
    }

}

function mapStateToProps(state) {
    return {
        navigationReducer: state.navigationReducer,
        loggedUserReducer: state.loggedUserReducer,
        fetchPostsReducer: state.fetchPostsReducer,
        postReducer: state.postReducer,
        loginReducer: state.loginReducer,
    };
}

export default connect(mapStateToProps)(HomePage);