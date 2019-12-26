//imports
import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[
          this.props.style,
          {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.buttonColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: this.props.borderRadius,
            flexDirection: this.props.flexDirection
          }
        ]}
        onPress={this.props.onPress}
        underlayColor={this.props.pressedColor}
      >
        <Text style={{
          color: "#FFFFFF",
          fontSize: this.props.fontSize, 
          fontWeight: this.props.fontWeight,
          width: this.props.textWidth,
          textAlign: 'center',
        }}>
          {this.props.buttonTitle}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default CustomButton;
