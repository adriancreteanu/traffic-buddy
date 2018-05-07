//imports
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

class LoginTextInput extends Component {

    render() {
        return (

            <View style={[styles.container, {
                width: this.props.width,
                height: this.props.height,
                borderRadius: this.props.borderRadius, 
                marginTop: this.props.marginTop, 
                marginBottom: this.props.marginBottom
            }]}>
                <Icon style={styles.iconStyle} name={this.props.icon} size={20} color="#000" />
                <TextInput
                    style={[
                        this.props.style,
                        {
                            flex: 1,
                            color: '#000',
                            fontSize: 16,
                            borderColor: "transparent",
                            borderWidth: 1,  
                        }
                    ]}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    editable={true}
                    maxLength={40}
                    underlineColorAndroid='transparent'
                    clearTextOnFocus={true}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#000"
                    autoCorrect={false}
                    maxLength={this.props.maxLength}
                    autoCapitalize={this.props.autoCapitalize}
                    secureTextEntry={this.props.isPassword}
                    keyboardType={this.props.keyboardType}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
    },
    iconStyle: {
        paddingLeft: 15, 
        paddingBottom: 20, 
        paddingTop: 20, 
        paddingRight: 10
    }
});


export default LoginTextInput;
