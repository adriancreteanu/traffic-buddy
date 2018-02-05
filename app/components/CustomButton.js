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
            width: 200,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "#3d5e2f",
            alignItems: "center",
            justifyContent: "center",
          }
        ]}
        onPress={this.props.onPress}
        underlayColor={"#396924"}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}> Log In </Text>
      </TouchableHighlight>
    );
  }
}

export default CustomButton;
