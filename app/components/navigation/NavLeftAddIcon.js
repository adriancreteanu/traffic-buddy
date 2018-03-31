//imports
import React, { Component } from "react";
import {
  View, 
  Text,
  TouchableHighlight, 
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NavLeftAddIcon extends Component {
  render() {
    return (
      <View style={{ marginLeft: 30}}>
        <TouchableHighlight
        underlayColor={"transparent"}
        onPress={ this.props.onPress }
        >
            <Icon 
              name='plus'
              size={20}
              color="#FFF"
            />
            
        </TouchableHighlight>
      </View>
    );
  }
}

export default NavLeftAddIcon;
