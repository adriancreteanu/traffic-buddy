//imports
import React, { Component } from "react";
import {
  View, 
  Text,
  TouchableHighlight, 
  Alert
} from 'react-native';

class NavTitleUI extends Component {
  render() {
    return (
     

        <Text style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 20, 
            color: "#FFF"
        }}> 
        {this.props.title}
         </Text>
        
    );
  }
}

 

export default NavTitleUI;
