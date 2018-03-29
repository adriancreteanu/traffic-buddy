import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

//navigation
import NavLeftIcon from '../components/navigation/NavLeftIcon';

// redux
import * as authPayloads from "../common/data/payloads/AuthenticationPayloads";
import * as authActions from "../common/redux/actions/AuthenticationActions";
import { connect } from 'react-redux';

// spinner
import { LinesLoader } from 'react-native-indicator';

// strings
import { strings } from "../common/localization/strings-repository";

class RegisterPage extends Component {

    static navigationOptions = {


        title: strings.registerPageTitle,
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

    componentWillReceiveProps(nextProps) {
        let register = nextProps.registerReducer;
        if (register != null) {
            if (register.errorViewModel != null) {
                this.displayMessage("Error", register.errorViewModel.errorMessage);
            }
        }
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

    displayMessage(title: String, message: String) {
        Alert.alert(title, message, [{ text: "Ok", onPress: () => { } }], {
            cancelable: true
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 40 }}
                        placeholder={strings.plateNumber}
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
                        placeholder={strings.firstName}
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
                        placeholder={strings.lastName}
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
                        placeholder={strings.email}
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
                        borderRadius={25}
                    />

                    <CustomTextInput
                        width={270}
                        style={{ marginTop: 10 }}
                        placeholder={strings.confirmPassword}
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
                        buttonTitle={strings.registerButton}
                        style={{ marginTop: 30 }}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.validateRegisterCredentials();
                        }}
                        borderRadius={0}
                        borderRadius={25}
                    />

                    {typeof this.props.registerReducer !== 'undefined' && this.props.registerReducer != null && this.props.registerReducer.isInProgress ? (
                        <View style={{
                            marginTop: 40,
                            marginBottom: 30
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