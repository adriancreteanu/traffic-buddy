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
            fontSize: this.props.fontSize,
            width: this.props.width,
            height: this.props.height,
            borderColor: "transparent",
            borderWidth: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            paddingLeft: this.props.paddingLeft,
            borderRadius: this.props.borderRadius, 
            textAlign: this.props.textAlign, 
          }
        ]}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        editable={true}
        maxLength={40}
        underlineColorAndroid='transparent'
        clearTextOnFocus={false}
        placeholder={this.props.placeholder}
        placeholderTextColor="#000"
        autoCorrect={false}
        maxLength={this.props.maxLength}
        autoCapitalize={this.props.autoCapitalize}
        secureTextEntry={this.props.isPassword}
        keyboardType={this.props.keyboardType}
        onEndEditing={this.props.onEndEditing}
      />
    );
  }
}

export default CustomTextInput;
