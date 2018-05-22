import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';

import { connect } from "react-redux";
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavRightIcon from '../components/navigation/NavRightIcon';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as colors from "../styles/Colors";
import { strings } from "../common/localization/strings-repository";
import CustomTextInput from '../components/CustomTextInput';

import * as userActions from "../common/redux/actions/UserActions";
import * as navActions from "../common/redux/actions/NavigationActions";
import { LinesLoader } from 'react-native-indicator';

class SearchPage extends Component {

    static navigationOptions = ({ navigation }) => ({

        headerTitle: <NavTitleUI title={strings.searchPageTitle} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: colors.General.appPrimary,
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: colors.General.whiteColor,
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: colors.General.whiteColor
    });

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userExists: null,
            searchInProgress: false,
        };
    }

    async onEndEditing() {

        this.setState({
            searchInProgress: true,
        })

        await userActions.fetchUserProfile(this.state.username)(this.props.dispatch);

        let userReducer = this.props.userReducer;

        if (userReducer.viewModel) {
            this.setState({
                userExists: true,
            })
        } else if (userReducer.errorViewModel) {
            this.setState({
                userExists: false,
            })
        }

        this.setState({
            searchInProgress: false,
        })
    }

    navigateToUserProfile() {
        let userReducer = this.props.userReducer;
        if (userReducer && userReducer.viewModel) {
            navActions.navigateToProfilePage(userReducer.viewModel.userProfileViewModel)(this.props.dispatch);
        }
    }


    renderUserSection(searchInProgress: boolean) {
        if (searchInProgress) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                    <LinesLoader
                        color={colors.General.appSecondary}
                        barHeight={65}
                        barWidth={6}
                        betweenSpace={7}
                    />
                </View>
            )
        } else if (this.state.userExists != null) {
            return (
                <TouchableHighlight
                    onPress={() => this.state.userExists ? this.navigateToUserProfile() : {}}
                    underlayColor={"transparent"}>
                    <View style={styles.userContainer}>
                        <View style={styles.userContainerContent}>
                            <Text style={styles.usernameTextStyle}>{this.state.username}</Text>
                            <Text style={styles.defaultText}>
                                {
                                    this.state.userExists ?
                                        strings.found :
                                        strings.notFound
                                }
                            </Text>

                            <View style={styles.sendInviteContainer}>
                                <Text style={styles.viewTextStyle}>
                                    {
                                        this.state.userExists ?
                                            strings.viewProfile.toUpperCase() :
                                            strings.sendInvite.toUpperCase()
                                    }
                                </Text>
                                <Icon
                                    name={this.state.userExists ? "user-circle" : "envelope-open"}
                                    size={30}
                                    color={colors.General.appSecondary}
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../assets/images/search_page_icon.png')}
                        style={{
                            width: 150,
                            height: 150,
                            marginTop: 100,
                            marginLeft: 5,
                        }}
                        resizeMode="contain" />
                </View>
            );
        }
    }

    render() {

        return (
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.1 }}
                colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                style={styles.container}
            >
                <View style={styles.container}>

                    <CustomTextInput
                        width={270}
                        height={60}
                        style={{ marginTop: 30 }}
                        placeholder={strings.searchPlaceholder}
                        onChangeText={text => {
                            this.setState({
                                ...this.state,
                                username: text
                            })
                            // To clear user section for a new search
                            text.length == 1 ? this.setState({ userExists: null }) : null
                        }}
                        value={this.state.username}
                        maxLength={7}
                        isPassword={false}
                        autoCapitalize={'characters'}
                        borderRadius={5}
                        textAlign={'center'}
                        fontSize={22}
                        onEndEditing={() => this.onEndEditing()}
                    />

                    {this.renderUserSection(this.state.searchInProgress)}

                </View>
            </LinearGradient>
        )

    }

}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    userContainer: {
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300 / 2,
        backgroundColor: 'rgba(248, 248, 248, 0.3)',
        marginTop: 70,
        borderWidth: 7,
        borderColor: colors.General.appSecondary,
    },
    userContainerContent: {
        flexDirection: 'column'
    },
    sendInviteContainer: {
        marginTop: 60,
        flexDirection: 'column',
        //justifyContent: 'center', 
        //backgroundColor: '#f00'
    },
    defaultText: {
        fontSize: 18,
        textAlign: 'center'
    },
    usernameTextStyle: {
        marginBottom: 10,
        fontSize: 22,
        textAlign: 'center',
        width: 200,
        fontWeight: 'bold'
    },
    viewTextStyle: {
        //marginTop: 60,
        fontSize: 22,
        textAlign: 'center',
        width: 200,
        fontWeight: 'bold'
    }

});


function mapStateToProps(state) {
    return {
        userReducer: state.userReducer,
    };
}


export default connect(mapStateToProps)(SearchPage);