//imports 
import React, { Component } from 'react';
import {
    View, 
    Text, 
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import DateHelper from "../common/helpers/DateHelper";

class HomePage extends Component {

    static navigationOptions = {
        title: DateHelper.generateCurrentDate()
    }

    
    render() {
        return(
            <View>
                <Text>Am navigat pe home</Text>
            </View>
        )
    }
}

export default HomePage;