import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { connect } from "react-redux";
import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavRightIcon from '../components/navigation/NavRightIcon';

import * as colors from "../styles/Colors";
import { strings } from "../common/localization/strings-repository";

class SearchPage extends Component {

    static navigationOptions = ({ navigation }) => ({

        headerTitle: <NavTitleUI title={strings.searchPageTitle} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: colors.General.appPrimary,
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: colors.General.whiteColor,
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: colors.General.whiteColor
    });

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }


    render() {

        return (
            <View style={styles.container}>
                <Text> Hello </Text>
            </View>
        )

    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


function mapStateToProps(state) {
    return {
        userReducer: state.userReducer,
    };
}


export default connect(mapStateToProps)(SearchPage);