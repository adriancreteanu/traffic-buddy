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

import LinearGradient from 'react-native-linear-gradient';

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
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: colors.General.whiteColor }} >

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


                <LinearGradient
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 0.1 }}
                    colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                    style={{ flex: 2 }}
                >

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
                            width={260}
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
                            width={260}
                            height={45}
                            buttonColor={colors.General.appSecondary}
                            pressedColor={colors.General.appSecondary}
                            buttonTitle={strings.sendMessage.toUpperCase()}
                            style={{ marginTop: 30 }}
                            borderRadius={5}
                            onPress={() => this.navigateToChatPage(this.props.navigation.state.params.user)}
                        />
                    </View>


                </LinearGradient>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.General.whiteColor,
    },
    topContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: "#f8f8f8",
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowOffset: { height: 5 },
        elevation: 6,
    },
    bottomContainer: {
        flex: 2,
        padding: 30,
        alignItems: 'center',
    },
    statisticsSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    textsSection: {
        paddingRight: 25,
        width: 150,
    },
    numbersSection: {
        paddingRight: 60
    },
    textStyle: {
        color: "#333",
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    numberStyle: {
        color: colors.General.appPrimary,
        fontSize: 24,
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