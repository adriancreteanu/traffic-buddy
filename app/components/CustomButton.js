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
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            //backgroundColor: "#3d5e2f", old color
            backgroundColor: "#a94242",
            alignItems: "center",
            justifyContent: "center",
          }
        ]}
        onPress={this.props.onPress}
        underlayColor={"#396924"}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}> {this.props.buttonTitle} </Text>
      </TouchableHighlight>
    );
  }
}

export default CustomButton;
