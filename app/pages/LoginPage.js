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
  TouchableWithoutFeedback
} from "react-native";

//custom components
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

//helpers
import Validation from "../common/helpers/Validation";

//Navigation
import * as navActions from "../common/redux/actions/NavigationActions";

//Authentication
import * as authActions from "../common/redux/actions/AuthenticationActions";
import * as authPayloads from "../common/data/payloads/AuthenticationPayloads";

import { connect } from 'react-redux';

import { strings } from "../common/localization/strings-repository";

// spinner 
import { LinesLoader } from 'react-native-indicator';

class LoginPage extends Component {
  static navigationOptions = {
    //header: null
    headerStyle: {
      //backgroundColor: '#c6bf69',
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
    },
  };


  /* Lifecycle methods */
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

    //move this to validation
    if (Validation.fieldIsEmpty(this.state.username)) {
      Alert.alert(
        "Empty username",
        "Please enter a username",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    } else {
      let payload: authPayloads.loginCredentialsPayloadType = {
        username: this.state.username, 
        email: "", // empty because we don't have user's email initially
        password: this.state.password
      };
      //let payload = authPayloads.createLoginCredentialsPayload(loginPayload);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={require('../assets/images/login_background.png')} style={styles.container} >
            <CustomTextInput
              width={240}
              height={50}
              style={{ marginTop: 30 }}
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

            <CustomTextInput
              width={240}
              height={50}
              style={{ marginTop: 10 }}
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
              buttonTitle={strings.loginButton.toUpperCase()}
              style={{ marginTop: 30 }}
              borderRadius={5}
              //onPress={() => navigate("HomePage", { screen: "Home page" })}
              onPress={() => {
                Keyboard.dismiss()
                this.validateLoginCredentials()
              }}
            />

            {typeof this.props.loginReducer !== 'undefined' && this.props.loginReducer != null && this.props.loginReducer.isInProgress ? (
              <View style={{
                marginTop: 40,
                marginBottom: -50,
                backgroundColor: 'transparent',
              }}>
                <LinesLoader
                  color='rgba(169, 20, 20, 0.9)'
                  barHeight={60}
                  barWidth={5}
                  betweenSpace={5}
                />
              </View>
            ) : (
                <View style={{ height: 50, backgroundColor: "transparent" }} />
              )}

            <Text style={styles.accountText}>{strings.dontHaveAccount}</Text>
            <TouchableHighlight
              onPress={() => {
                this.navigateToRegisterPage()
              }}
              underlayColor="transparent"
            >
              <Text style={styles.registerText}>{strings.registerHere}</Text>
            </TouchableHighlight>

          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: 170
    //backgroundColor: "#a94242" //initial red color
    //backgroundColor: "#4F6D7A"
    //backgroundColor: "#c6bf69"
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
    marginTop: 150
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