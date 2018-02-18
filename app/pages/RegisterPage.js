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
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",

        };
    }

    render() {
        return (
            <View style={styles.container}>

                <CustomTextInput
                    style={{ marginTop: 70 }}
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
                    style={{ marginTop: 10 }}
                    placeholder="Username"
                    onChangeText={text =>
                        this.setState({
                            ...this.state,
                            username: text
                        })
                    }
                    value={this.state.username}
                    autoCapitalize="characters"
                />

                <CustomTextInput
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
                    style={{ marginTop: 30 }}
                    onPress={() => { }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#a94242"
    }
});

export default RegisterPage;