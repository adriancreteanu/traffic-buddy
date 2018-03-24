import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import CustomButton from "../components/CustomButton";

// strings
import { strings } from "../common/localization/strings-repository";

// redux
import { connect } from 'react-redux';
import * as authActions from "../common/redux/actions/AuthenticationActions";

class SettingsPage extends Component {

    static navigationOptions = {


        title: strings.settingsPageTitle,
        //headerStyle: { backgroundColor: '#a94242', borderWidth: 1, borderBottomColor: 'white' },
        headerStyle: {
            backgroundColor: '#4F6D7A',
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
    }

    logOutUser() {
        authActions.signOutAction()(this.props.dispatch);
    }


    render() {
        return (
            <View style={styles.container}>
                <CustomButton
                    width={220}
                    buttonTitle={strings.logOut}
                    style={{ marginTop: 30 }}
                    borderRadius={25}
                    //onPress={() => navigate("HomePage", { screen: "Home page" })}
                    onPress={() => {
                        this.logOutUser();
                    }}
                />
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return {
        navigationReducer: state.navigationReducer
    };
}

export default connect(mapStateToProps)(SettingsPage);