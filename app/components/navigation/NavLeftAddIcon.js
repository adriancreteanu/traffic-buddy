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
      <View style={{ marginLeft: 0 }}>
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={this.props.onPress}
        >
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 50,
           // backgroundColor: '#A45'
          }}>
            <Icon
              name='plus'
              size={20}
              color="#FFF"
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default NavLeftAddIcon;
