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
            color: '#FFF',
            fontWeight: 'bold',
            width: this.props.width,
            height: 40,
            borderColor: "gray",
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
        placeholderTextColor="#FFF"
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
