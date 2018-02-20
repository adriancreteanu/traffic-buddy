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
            width: this.props.width,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "#FFFFFF",
            paddingLeft: 10,
          }
        ]}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        editable={true}
        maxLength={40}
        underlineColorAndroid='transparent'
        clearTextOnFocus={true}
        placeholder={this.props.placeholder}
        placeholderTextColor="#808080"
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
