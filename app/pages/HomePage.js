//imports 
import React, { Component } from 'react';
import {
    View, 
    Text, 
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import DateHelper from "../common/helpers/DateHelper";

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

class HomePage extends Component {

    static navigationOptions = {
        //title: DateHelper.generateCurrentDate(),
        headerTitle: <NavTitleUI title={DateHelper.generateCurrentDate()}/>,
        headerLeft: <NavLeftIcon />,
        headerRight: <NavRightIcon />
    }

    
    render() {
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>Bine ati venit</Text>
            </View>
        )
    }
}

export default HomePage;