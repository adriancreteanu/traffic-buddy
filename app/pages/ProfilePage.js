import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
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

import * as navActions from "../common/redux/actions/NavigationActions";
import PostModel from '../common/data/models/PostModel';

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

    constructor(props) {
        super(props);

        this.state = {
            likeIconClicked: false, 
            dislikeIconClicked: false
        };
    }

    navigateToChatPage(post: PostModel) {
        navActions.navigateToChatPage(post)(this.props.dispatch);
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.topContainer}>

                    <View style={styles.statisticsSection}>
                        <View style={styles.textsSection}>
                            <Text style={styles.textStyle}>{strings.rank}</Text>
                            <Text style={styles.textStyle}>{strings.likes}</Text>
                            <Text style={styles.textStyle}>{strings.dislikes}</Text>
                        </View>

                        <View style={styles.numbersSection}>
                            <Text style={styles.numberStyle}>15</Text>
                            <Text style={styles.numberStyle}>77</Text>
                            <Text style={styles.numberStyle}>134</Text>
                        </View>
                    </View>



                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.iconsSection}>
                        <TouchableHighlight
                            onShowUnderlay={() => this.setState({
                                likeIconClicked: true
                            })}
                            onHideUnderlay={() => this.setState({
                                likeIconClicked: false
                            })}
                            onPress={() => console.log("Icon pressed")}
                            underlayColor="transparent"
                        >

                            <Icon
                                name={"thumbs-up"}
                                size={50}
                                color={
                                    !this.state.likeIconClicked ?
                                        colors.General.appSecondary :
                                        colors.General.blueColor
                                }
                            />
                        </TouchableHighlight>

                        <TouchableHighlight
                            onShowUnderlay={() => this.setState({
                                dislikeIconClicked: true
                            })}
                            onHideUnderlay={() => this.setState({
                                dislikeIconClicked: false
                            })}
                            onPress={() => console.log("Icon pressed")}
                            underlayColor="transparent"
                        >

                            <Icon
                                name={"thumbs-down"}
                                size={50}
                                color={
                                    !this.state.dislikeIconClicked ?
                                        colors.General.appSecondary :
                                        colors.General.redColor
                                }
                            />
                        </TouchableHighlight>

                    </View>

                    <CustomButton
                        width={240}
                        height={45}
                        buttonColor={colors.General.appSecondary}
                        pressedColor={colors.General.appSecondary}
                        buttonTitle={strings.connect.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => {

                        }}
                    />

                    <CustomButton
                        width={240}
                        height={45}
                        buttonColor={colors.General.appPrimary}
                        pressedColor={colors.General.appPrimary}
                        buttonTitle={strings.sendMessage.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => this.navigateToChatPage(this.props.navigation.state.params.user)}
                    />
                </View>



            </ScrollView>
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
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: colors.General.whiteColor,
    },
    bottomContainer: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: colors.General.whiteColor,
    },
    statisticsSection: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    textsSection: {
        //backgroundColor: colors.General.blueColor,
        paddingRight: 15,
        width: 100,
    },
    numbersSection: {
        //backgroundColor: colors.General.redColor, 
        paddingRight: 35
    },
    textStyle: {
        color: "#333",
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    numberStyle: {
        color: colors.General.appPrimary,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: 'bold',
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