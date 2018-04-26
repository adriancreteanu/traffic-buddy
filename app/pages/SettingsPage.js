import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ImageBackground
} from 'react-native';

import CustomButton from "../components/CustomButton";

// strings
import { strings } from "../common/localization/strings-repository";

// redux
import { connect } from 'react-redux';
import * as authActions from "../common/redux/actions/AuthenticationActions";
import NavLeftIcon from '../components/navigation/NavLeftIcon';

class SettingsPage extends Component {

    static navigationOptions = ({ navigation }) => ({

        title: strings.settingsPageTitle,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
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


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../assets/images/post_background.png')} style={styles.container} >
                    <CustomButton
                        width={300}
                        height={50}
                        buttonTitle={strings.logOut}
                        style={{ marginTop: 30, marginBottom: 40 }}
                        //borderRadius={5}
                        onPress={() => {
                            this.logOutAlert();
                        }}
                    //flexDirection={"row"}
                    />
                </ImageBackground>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    }
});

function mapStateToProps(state) {
    return {
        navigationReducer: state.navigationReducer
    };
}

export default connect(mapStateToProps)(SettingsPage);