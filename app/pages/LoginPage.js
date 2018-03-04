//imports
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
  Alert
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

  async validateLoginCredentials() {

    //move this to validation
    if(Validation.fieldIsEmpty(this.state.username)) {
      Alert.alert(
        "Empty username", 
        "Please enter a username",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      let payload = authPayloads.createLoginCredentialsPayload(this.state.username, this.state.password);
      authActions.loginWithEmailAction(payload)(this.props.dispatch);
    }
  }


  navigateToHomePage() {
    navActions.navigateToHomePage()(this.props.dispatch);
  }

  navigateToRegisterPage() {
    navActions.navigateToRegisterPage()(this.props.dispatch);
  }


  render() {
    //const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Text style={styles.appTitle}> TRAFFIC BUDDY </Text>
        <CustomTextInput
          width={200}
          style={{ marginTop: 30 }}
          placeholder="Username"
          onChangeText={text =>
            this.setState({
              ...this.state,
              username: text
            })
          }
          value={this.state.username}
          //maxLength={7}
          //autoCapitalize="characters"
        />

        <CustomTextInput
          width={200}
          style={{ marginTop: 10 }}
          placeholder="Password"
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
          width={200}
          buttonTitle="Log In"
          style={{ marginTop: 30 }}
          //onPress={() => navigate("HomePage", { screen: "Home page" })}
          onPress={() => this.validateLoginCredentials()}
        />

        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableHighlight
          onPress={() => this.navigateToRegisterPage() }
          underlayColor="transparent"
        >
          <Text style={styles.registerText}>Register here </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#a94242"
  },
  appTitle: {
    fontSize: 26,
    marginTop: "40%",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  accountText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 30
  },
  registerText: {
    width: 200, //necessary because of the fontweight
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFFFFF",
    marginTop: 10,
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