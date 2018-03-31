//imports
import React, { Component } from "react";
import {
  View, 
  Text,
  TouchableHighlight, 
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NavRightIcon extends Component {
  render() {
    return (
      <View style={{ marginRight: 20}}>
        <TouchableHighlight
        underlayColor={"transparent"}
        onPress={ this.props.onPress }
        >
            <Icon 
              name={this.props.icon}
              size={22}
              color="#FFF"
            />
            
        </TouchableHighlight>
      </View>
    );
  }

  ceFacAcum() {
    Alert.alert(
          "Warning", 
          "Not implemented yet",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
  }
}

export default NavRightIcon;
