import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import NavTitleUI from '../components/navigation/NavTitleUI';
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavRightIcon from '../components/navigation/NavRightIcon';

import * as colors from "../styles/Colors";

// strings
import { strings } from "../common/localization/strings-repository";

import { connect } from 'react-redux';
import CustomButton from '../components/CustomButton';

import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../components/CustomTextInput';

class ProfilePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={navigation.state.params.user.username} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => {
                navigation.goBack();
            }}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: '#FA1',
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: '#FFF',
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: '#FFF'
    });

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.topContainer}>
                    <Text style={styles.textStyle}>{strings.rank}: 15</Text>
                    <Text style={styles.textStyle}>{strings.likes}: 66</Text>
                    <Text style={styles.textStyle}>{strings.dislikes}: 89</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.iconsSection}>
                        <Icon
                            name={"thumbs-up"}
                            size={50}
                            color={colors.General.appPrimary}
                        />

                        <Icon
                            name={"thumbs-down"}
                            size={50}
                            color={colors.General.appSecondary}
                        />
                    </View>

                    <CustomButton
                        width={240}
                        height={45}
                        buttonTitle={strings.connect.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => {

                        }}
                    />

                    <CustomButton
                        width={240}
                        height={45}
                        buttonTitle={strings.sendMessage.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => {

                        }}
                    />

                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20
    },
    topContainer: {
        marginTop: 20,
        marginBottom: 15, 
        padding: 30,
        alignItems: 'center', 
        backgroundColor: colors.General.whiteColor,
    },
    bottomContainer: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: colors.General.whiteColor,
    },
    buttonsSection: {
        alignItems: 'center'
    },
    textStyle: {
        color: "#333",
        fontSize: 20,
        marginBottom: 20,
    },
    iconsSection: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginBottom: 20
    }
});

function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    };
}


export default connect(mapStateToProps)(ProfilePage);