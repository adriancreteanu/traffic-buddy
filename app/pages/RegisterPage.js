import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

//navigation
import NavLeftIcon from '../components/navigation/NavLeftIcon';

// redux
import * as authPayloads from "../common/data/payloads/AuthenticationPayloads";
import * as authActions from "../common/redux/actions/AuthenticationActions";
import { connect } from 'react-redux';

class RegisterPage extends Component {

    static navigationOptions = {


        title: 'Registration',
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



    constructor(props) {
        super(props);
        this.state = {
            plateNumber: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",

        };
    }

    validateRegisterCredentials() {
        let registerPayload: authPayloads.registerCredentialsPayloadType = {
            plateNumber: this.state.plateNumber,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        let payload = authPayloads.createRegisterCredentialsPayload(registerPayload);
        authActions.registerAction(payload)(this.props.dispatch);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 40 }}
                        placeholder="Plate number"
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                plateNumber: text
                            })
                        }
                        value={this.state.plateNumber}
                        autoCapitalize="characters"
                        maxLength={7}
                        borderRadius={25}
                    />

                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 10 }}
                        placeholder="First name"
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                firstName: text
                            })
                        }
                        value={this.state.firstName}
                        //autoCapitalize="characters"
                        borderRadius={25}
                    />

                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 10 }}
                        placeholder="Last name"
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                lastName: text
                            })
                        }
                        value={this.state.lastName}
                        borderRadius={25}
                    //autoCapitalize="characters"
                    />

                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 10 }}
                        placeholder="Email"
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                email: text
                            })
                        }
                        value={this.state.email}
                        borderRadius={25}
                    />

                    <CustomTextInput
                        width={270}
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
                        borderRadius={25}
                    />

                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 10 }}
                        placeholder="Confirm password"
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                confirmPassword: text
                            })
                        }
                        value={this.state.confirmPassword}
                        maxLength={20}
                        isPassword={true}
                        borderRadius={25}
                    />

                    <CustomButton
                        width={270}
                        buttonTitle="Register"
                        style={{ marginTop: 30 }}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.validateRegisterCredentials();
                        }}
                        borderRadius={0}
                        borderRadius={25}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#4F6D7A"
    }
});

function mapStateToProps(state) {
    return {
        registerReducer: state.registerReducer
    }
}

export default connect(mapStateToProps)(RegisterPage);