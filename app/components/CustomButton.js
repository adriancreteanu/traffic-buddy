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
            backgroundColor: 'rgba(169, 20, 20, 0.9)',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: this.props.borderRadius
          }
        ]}
        onPress={this.props.onPress}
        underlayColor="rgba(169, 66, 66, 0.85)"
      >
        <Text style={{
          color: "#FFFFFF",
          fontSize: 16, 
        }}>
          {this.props.buttonTitle}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default CustomButton;
