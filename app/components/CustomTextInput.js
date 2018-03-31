//imports
import React, { Component } from "react";
import { Text, StyleSheet, TextInput } from "react-native";

class CustomTextInput extends Component {

  render() {
    return (
      <TextInput
        style={[
          this.props.style,
          {
            color: '#000',
            //fontWeight: 'bold',
            fontSize: 16,
            width: this.props.width,
            height: this.props.height,
            borderColor: "transparent",
            borderWidth: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            paddingLeft: 20,
            borderRadius: this.props.borderRadius
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
    );
  }
}

export default CustomTextInput;
