import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as colors from "../styles/Colors";

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
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavRightIcon from '../components/navigation/NavRightIcon';

class RegisterPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={strings.registerPageTitle} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        //headerStyle: { backgroundColor: '#a94242', borderWidth: 1, borderBottomColor: 'white' },
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
            <LinearGradient
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.1 }}
        colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
        style={{ flex: 1 }}
      >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <CustomTextInput
                        width={270}
                        height={50}
                        style={{ marginTop: 20 }}
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
                        borderRadius={5}
                    />

                    <CustomTextInput
                        width={270}
                        height={50}
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
                        borderRadius={5}
                    />

                    <CustomTextInput
                        width={270}
                        height={50}
                        style={{ marginTop: 10 }}
                        placeholder={strings.lastName}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                lastName: text
                            })
                        }
                        value={this.state.lastName}
                        borderRadius={5}
                    //autoCapitalize="characters"
                    />

                    <CustomTextInput
                        width={270}
                        height={50}
                        style={{ marginTop: 10 }}
                        placeholder={strings.email}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                email: text
                            })
                        }
                        value={this.state.email}
                        borderRadius={5}
                    />

                    <CustomTextInput
                        width={270}
                        height={50}
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
                        borderRadius={5}
                    />

                    <CustomTextInput
                        width={270}
                        height={50}
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
                        borderRadius={5}
                    />

                    <CustomButton
                        width={270}
                        height={40}
                        buttonTitle={strings.registerButton}
                        style={{ marginTop: 30 }}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.validateRegisterCredentials();
                        }}

                        borderRadius={5}
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
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    }
});

function mapStateToProps(state) {
    return {
        registerReducer: state.registerReducer
    }
}

export default connect(mapStateToProps)(RegisterPage);