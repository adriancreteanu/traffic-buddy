import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ImageBackground,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as colors from "../styles/Colors";

import CustomButton from "../components/CustomButton";



// strings
import { strings } from "../common/localization/strings-repository";

// redux
import { connect } from 'react-redux';
import * as authActions from "../common/redux/actions/AuthenticationActions";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavRightIcon from '../components/navigation/NavRightIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';
import PreferencesRepo from '../common/data/repos/PreferencesRepo';
import { PreferenceKeys } from '../common/constants/PreferenceKeys';

import * as navActions from "../common/redux/actions/NavigationActions";

class SettingsPage extends Component {

    static navigationOptions = ({ navigation }) => ({

        headerTitle: <NavTitleUI title={strings.settingsPageTitle.toUpperCase()} />,
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

    logOutAlert() {
        Alert.alert(
            strings.confirmSignOut,
            strings.areYouSureSignOut,
            [
                {
                    text: strings.yesAlertOption,
                    onPress: () => this.logOutUser(),
                    style: 'default'
                },
                {
                    text: strings.cancelAlertOption,
                    onPress: () => { },
                    style: 'cancel'
                },
            ],
            { cancelable: false }
        )
    }

    logOutUser() {
        authActions.signOutAction()(this.props.dispatch);
    }

    constructor(props) {
        super(props);
        this.state = {
            loggedUser: null
        }

        this.preferencesRepo = new PreferencesRepo();



        this.width = Dimensions.get('window').width,
            this.height = Dimensions.get('window').height
    }

    async componentWillReceiveProps(nextProps) {
        let loggedUserReducer = nextProps.loggedUserReducer;

        if (loggedUserReducer && loggedUserReducer.viewModel) {
            await this.setState({
                loggedUser: loggedUserReducer.viewModel.userProfileViewModel
            })
        }
    }

    navigateToMyProfile(loggedUser: string) {
        navActions.navigateToProfilePage(loggedUser)(this.props.dispatch);
    }


    render() {


        return (
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.1 }}
                colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <CustomButton
                        width={'75%'}
                        height={Platform.OS == "ios" ? 50 : 60}
                        buttonColor={colors.General.appSecondary}
                        pressedColor={colors.General.appSecondary}
                        buttonTitle={strings.myProfile}
                        style={{ marginTop: 30, marginBottom: 10 }}
                        onPress={() => {
                            this.navigateToMyProfile(this.state.loggedUser)
                        }}
                        fontSize={24}
                        borderRadius={5}
                    />

                    <CustomButton
                        width={'75%'}
                        height={Platform.OS == "ios" ? 50 : 60}
                        buttonColor={colors.General.appSecondary}
                        pressedColor={colors.General.appSecondary}
                        buttonTitle={strings.friends}
                        style={{ marginTop: 20, marginBottom: 10 }}
                        onPress={() => {
                            alert("Not implemented");
                        }}
                        fontSize={24}
                        borderRadius={5}
                    />

                    <CustomButton
                        width={'75%'}
                        height={Platform.OS == "ios" ? 50 : 60}
                        style={{
                            position: 'absolute',
                            height: 40,
                            left: this.width / 8,
                            top: Platform.OS == "ios" ? this.height - 140 : this.height - 180,
                            width: this.width,
                        }}
                        buttonColor={colors.General.appSecondary}
                        pressedColor={colors.General.appSecondary}
                        buttonTitle={strings.logOut}
                        //style={{ marginTop: 160, marginBottom: 10 }}
                        //borderRadius={5}
                        onPress={() => {
                            this.logOutAlert();
                        }}
                        fontSize={24}
                        borderRadius={Platform.OS == "ios" ? 30 : 35}
                    />

                </View>
            </LinearGradient>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});

function mapStateToProps(state) {
    return {
        loggedUserReducer: state.loggedUserReducer,
        navigationReducer: state.navigationReducer
    };
}

export default connect(mapStateToProps)(SettingsPage);