import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

//navigation
import NavLeftIcon from '../components/navigation/NavLeftIcon';

class RegisterPage extends Component {

    static navigationOptions = {


        title: 'Registration',
        //headerStyle: { backgroundColor: '#a94242', borderWidth: 1, borderBottomColor: 'white' },
        headerStyle: {
            backgroundColor: '#455A64',
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
            phoneNumber: "",
            password: "",
            confirmPassword: "",

        };
    }

    render() {
        return (
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
                />

                <CustomTextInput
                    width={270}
                    style={{ marginTop: 10 }}
                    placeholder="Phone number"
                    onChangeText={text =>
                        this.setState({
                            ...this.state,
                            phoneNumber: text
                        })
                    }
                    value={this.state.phoneNumber}
                    keyboardType="numeric"
                    maxLength={10}
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
                />

                <CustomButton
                    width={270}
                    buttonTitle="Register"
                    style={{ marginTop: 30 }}
                    onPress={() => { }}
                    borderRadius={0}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#455A64"
    }
});

export default RegisterPage;