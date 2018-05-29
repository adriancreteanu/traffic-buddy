//imports
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import * as colors from "../styles/Colors";

//custom components
import CustomButton from "../components/CustomButton";

//helpers
import InputValidationHelper from "../common/helpers/InputValidationHelper";

//Navigation
import * as navActions from "../common/redux/actions/NavigationActions";

//Authentication
import * as authActions from "../common/redux/actions/AuthenticationActions";
import * as authPayloads from "../common/data/payloads/AuthenticationPayloads";

import { connect } from 'react-redux';

import { strings } from "../common/localization/strings-repository";

// spinner 
import { LinesLoader } from 'react-native-indicator';
import LoginTextInput from "../components/LoginTextInput";

import AlertHelper from "../common/helpers/AlertHelper";


class LoginPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    //Check if user has authenticated successfully
    let login = nextProps.loginReducer;
    if (login != null) {
      if (login.errorViewModel != null) {
        this.displayMessage("Error", login.errorViewModel.errorMessage);
      }
    }
  }

  displayMessage(title: String, message: String) {
    Alert.alert(title, message, [{ text: "Ok", onPress: () => { } }], {
      cancelable: true
    });
  }

  validateLoginCredentials() {
    if (InputValidationHelper.fieldIsEmpty(this.state.username)) {
      AlertHelper.createInfoAlert(strings.emptyUsernameAlertTitle, strings.emptyUsernameAlertMessage);
    } else if (InputValidationHelper.fieldIsEmpty(this.state.password)) {
      AlertHelper.createInfoAlert(strings.emptyPasswordAlertTitle, strings.emptyPasswordAlertMessage);
    } else {
      let payload: authPayloads.loginCredentialsPayloadType = {
        username: this.state.username,
        email: "", // empty because we don't have user's email initially
        password: this.state.password
      };
      authActions.loginUser(payload)(this.props.dispatch);
    }
  }


  navigateToHomePage() {
    navActions.navigateToHomePage()(this.props.dispatch);
  }

  navigateToRegisterPage() {
    navActions.navigateToRegisterPage()(this.props.dispatch);
  }


  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.1 }}
        colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
        style={{ flex: 1 }}
      >

        <View style={{
          marginTop: 70,
          marginBottom: 30,
          width: undefined,
          height: '25%',
        }}>
          <Image
            source={require('../assets/images/login_icon.png')}
            style={{

              alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain" />

        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>

            <LoginTextInput
              icon={"car"}
              width={240}
              height={50}
              marginBottom={15}
              borderRadius={5}
              placeholder={strings.username}
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  username: text
                })
              }
              value={this.state.username}
              maxLength={7}
              autoCapitalize="characters"
            />

            <LoginTextInput
              icon={"key"}
              width={240}
              height={50}
              borderRadius={5}
              placeholder={strings.password}
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  password: text
                })
              }
              value={this.state.password}
              maxLength={20}
              isPassword={true}
            />

            <CustomButton
              width={240}
              height={45}
              buttonColor={colors.General.appSecondary}
              pressedColor={colors.General.appSecondary}
              buttonTitle={strings.loginButton.toUpperCase()}
              style={{ marginTop: 30 }}
              borderRadius={5}
              onPress={() => {
                Keyboard.dismiss()
                this.validateLoginCredentials()
              }}
              fontSize={16}
            />

            {typeof this.props.loginReducer !== 'undefined' && this.props.loginReducer != null && this.props.loginReducer.isInProgress ? (
              <View style={{
                marginTop: 30,
                marginBottom: -40,
                backgroundColor: 'transparent',
              }}>
                <LinesLoader
                  color={colors.General.appSecondary}
                  barHeight={60}
                  barWidth={5}
                  betweenSpace={5}
                />
              </View>
            ) : (
                <View style={{ height: 50, backgroundColor: "transparent" }} />
              )}

            <TouchableHighlight
              onPress={() => {
                this.navigateToRegisterPage()
              }}
              underlayColor="transparent"
            >
              <View style={{
                justifyContent: 'center',

              }}>
                <Text style={styles.accountText}>{strings.dontHaveAccount}</Text>

                <Text style={styles.registerText}>{strings.registerHere}</Text>
              </View>
            </TouchableHighlight>


          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 26,
    marginTop: "40%",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  accountText: {
    fontSize: 16,
    color: "#000",
    marginTop: 50,
    textAlign: 'center',
  },
  registerText: {
    width: 200, //necessary because of the fontweight
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 3,
  }
});

function mapStateToProps(state) {
  return {
    loginReducer: state.loginReducer,
  };
}

export default connect(mapStateToProps)(LoginPage);


// <ImageBackground
//           source={require("../assets/images/traffic-buddy.jpg")}
//           style={{ width: "100%", height: "100%" }}
//           resizeMode="cover"
//         >