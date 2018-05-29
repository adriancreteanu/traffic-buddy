import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavRightIcon from '../components/navigation/NavRightIcon';

import UserProfileData from "../components/UserProfileData";

import * as colors from "../styles/Colors";

// strings
import { strings } from "../common/localization/strings-repository";

import { connect } from 'react-redux';
import CustomButton from '../components/CustomButton';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as navActions from "../common/redux/actions/NavigationActions";
import PostModel from '../common/data/models/PostModel';

import LinearGradient from 'react-native-linear-gradient';

import * as userActions from "../common/redux/actions/UserActions";
import { LinesLoader } from 'react-native-indicator';
import PreferencesRepo from '../common/data/repos/PreferencesRepo';
import { PreferenceKeys } from '../common/constants/PreferenceKeys';

class ProfilePage extends Component {

    static navigationOptions = ({ navigation }) => ({

        headerTitle: <NavTitleUI title={navigation.state.params.user.username} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: '#FA1',
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
            likeIconClicked: false,
            dislikeIconClicked: false,
            isLoggedUserProfile: false,
            user: null, 
        };

        this.preferencesRepo = new PreferencesRepo();
    }

    async componentDidMount() {
        const username = this.props.navigation.state.params.user.username;
        const loggedUser = await this.preferencesRepo.getValue(PreferenceKeys.loggedInUsername);


        /* If we navigate from search page, we don't need to fetch the user again, hence the second if. */

        if (username == loggedUser) {
            await this.setState({
                isLoggedUserProfile: true,
                user: this.props.loggedUserReducer.viewModel.userProfileViewModel,
            });
            return;
        } 
        // else if (this.props.userReducer.viewModel) {
        //     return;
        // }

        /* Action called only when we navigate from home page. */
        userActions.fetchUserProfile(username)(this.props.dispatch);
    }

    navigateToChatPage(post: PostModel) {
        navActions.navigateToChatPage(post)(this.props.dispatch);
    }

    renderSocialButtons() {
        return !this.state.isLoggedUserProfile ? (
            <View style={styles.bottomContainer}>
                <View style={styles.iconsSection}>
                    <TouchableHighlight
                        onShowUnderlay={() => this.setState({
                            likeIconClicked: true
                        })}
                        onHideUnderlay={() => this.setState({
                            likeIconClicked: false
                        })}
                        onPress={() => console.log("Icon pressed")}
                        underlayColor="transparent"
                    >

                        <Icon
                            name={"thumbs-up"}
                            size={50}
                            color={
                                !this.state.likeIconClicked ?
                                    colors.General.appSecondary :
                                    colors.General.blueColor
                            }
                        />
                    </TouchableHighlight>

                    <TouchableHighlight
                        onShowUnderlay={() => this.setState({
                            dislikeIconClicked: true
                        })}
                        onHideUnderlay={() => this.setState({
                            dislikeIconClicked: false
                        })}
                        onPress={() => console.log("Icon pressed")}
                        underlayColor="transparent"
                    >

                        <Icon
                            name={"thumbs-down"}
                            size={50}
                            color={
                                !this.state.dislikeIconClicked ?
                                    colors.General.appSecondary :
                                    colors.General.redColor
                            }
                        />
                    </TouchableHighlight>

                </View>
                <CustomButton
                    width={260}
                    height={45}
                    buttonColor={colors.General.appSecondary}
                    pressedColor={colors.General.appSecondary}
                    buttonTitle={strings.connect.toUpperCase()}
                    style={{ marginTop: 30 }}
                    borderRadius={5}
                    onPress={() => {
                    }}
                    fontSize={16}
                />

                <CustomButton
                    width={260}
                    height={45}
                    buttonColor={colors.General.appSecondary}
                    pressedColor={colors.General.appSecondary}
                    buttonTitle={strings.sendMessage.toUpperCase()}
                    style={{ marginTop: 30 }}
                    borderRadius={5}
                    onPress={() => this.navigateToChatPage(this.props.navigation.state.params.user.username)}
                    fontSize={16}
                />
            </View>
        ) :
            <UserProfileData
                containerFlex={2.5}
                user={this.state.user}
            />

    }

    render() {

        let userData = null;

        if (this.state.isLoggedUserProfile) {
            userData = this.props.loggedUserReducer.viewModel.userProfileViewModel;
        } else if (this.props.userReducer.viewModel) {
            userData = this.props.userReducer.viewModel.userProfileViewModel
        }

        return userData ? (


            <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.1 }}
                colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                locations={[0, 0.4, 0.7]}
                style={{ flex: 1 }}
            >
                <View style={styles.topContainer}>
                    <View style={styles.statisticsSection}>
                        <View style={styles.textsSection}>
                            <Text style={styles.textStyle}>{strings.rank}</Text>
                            <Text style={styles.textStyle}>{strings.likes}</Text>
                            <Text style={styles.textStyle}>{strings.dislikes}</Text>
                        </View>

                        <View style={styles.numbersSection}>
                            <Text style={styles.numberStyle}>{userData.ranking.rank}</Text>
                            <Text style={styles.numberStyle}>{userData.ranking.likes}</Text>
                            <Text style={styles.numberStyle}>{userData.ranking.dislikes}</Text>
                        </View>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: "transparent" }} >

                    {this.renderSocialButtons()}

                </ScrollView>
            </LinearGradient>
        ) : (
                <LinearGradient
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 0.1 }}
                    colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                    style={{ flex: 2 }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <LinesLoader
                            //color='rgba(169, 20, 20, 0.9)'
                            color={colors.General.appSecondary}
                            barHeight={65}
                            barWidth={6}
                            betweenSpace={7}
                        />
                    </View>
                </LinearGradient>
            );
    }
}

const styles2 = StyleSheet.create({
    hello: {
        flex: 1,
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        //flex: 1,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(248,248,248, 0.7)',
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowOffset: { height: 5 },
        elevation: 6,
    },
    bottomContainer: {
        flex: 2.5,
        padding: 40,
        alignItems: 'center',
    },
    statisticsSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    textsSection: {
        paddingRight: 25,
        width: 150,
    },
    numbersSection: {
        paddingRight: 60
    },
    textStyle: {
        color: "#333",
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    numberStyle: {
        color: colors.General.appPrimary,
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    iconsSection: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginBottom: 20
    }
});

function mapStateToProps(state) {
    return {
        loggedUserReducer: state.loggedUserReducer,
        userReducer: state.userReducer,
    };
}


export default connect(mapStateToProps)(ProfilePage);