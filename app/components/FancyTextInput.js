//imports
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput, 
    Platform,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from "../styles/Colors";

class FancyTextInput extends Component {

    render() {
        return (

            <View style={[styles.container, {
                width: this.props.width,
                height: this.props.height,
                borderRadius: this.props.borderRadius, 
                marginTop: this.props.marginTop, 
                marginBottom: this.props.marginBottom
            }]}>
                <Text style={styles.placeholder}>
                     {this.props.placeholder}
                </Text>
                <TextInput
                    style={[
                        this.props.style,
                        {
                            flex: 1,
                            color: '#000',
                            fontSize: 16,
                            borderColor: "transparent",
                            borderWidth: 1,  
                            //backgroundColor: '#f00', 
                            marginLeft: 50,
                            paddingBottom: Platform.OS == "ios" ? 10 : 8, 
                            //fontWeight: '400',
                            // new line
                            //marginTop: 5,
                            textAlignVertical: 'center',
                            
                        }
                    ]}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    editable={this.props.editable}
                    maxLength={40}
                    underlineColorAndroid='transparent'
                    clearTextOnFocus={false}
                    multiline={true}
                    placeholder={this.props.hint}
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
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    },
    placeholder: {
        marginLeft: 5, 
        marginTop: 2,
        padding: 5,
        paddingBottom: 0,  
        //paddingBottom: 20, 
        marginRight: 6,
        //paddingRight: 10, 
        alignSelf: 'flex-start',
         //backgroundColor: '#00f',
        fontWeight: '100',
        color: "#222",
        width: 200,
    }
});


export default FancyTextInput;
