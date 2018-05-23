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
            //borderColor: "gray",
            //borderWidth: 1,
            //backgroundColor: "#3d5e2f", old color
            //backgroundColor: "#a94242",
            //backgroundColor: 'rgba(169, 20, 20, 0.9)',
            //backgroundColor: 'rgba(51,102,136, 0.8)',
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
        }}>
          {this.props.buttonTitle}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default CustomButton;
