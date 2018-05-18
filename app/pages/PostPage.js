//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
    Keyboard,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';

import { Picker } from 'native-base'

import LinearGradient from 'react-native-linear-gradient';
import * as colors from "../styles/Colors";

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

// strings
import { strings } from "../common/localization/strings-repository";
import CustomTextInput from '../components/CustomTextInput';
import CustomBigTextInput from '../components/CustomBigTextInput';
import CustomButton from '../components/CustomButton';

//helpers
import Validation from "../common/helpers/Validation";

// redux
import * as newsFeedPayloads from "../common/data/payloads/NewsFeedPayloads";
import * as newsFeedActions from "../common/redux/actions/NewsFeedActions";
import { connect } from 'react-redux';
import { LinesLoader } from 'react-native-indicator';

class PostPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title="Post" />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => navigation.goBack()}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: '#FA1',
            borderBottomColor: 'transparent',
            borderBottomWidth: 1
        },
        headerTitleStyle: {
            color: colors.General.whiteColor,
            width: 250,
            textAlign: 'center'
        },
        //the back button color
        headerTintColor: '#FFF'
    });

    /* Lifecycle methods */
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            category: "",
            message: "",
        }
    }

    validatePostDetails() {
        if (Validation.fieldIsEmpty(this.state.category)) {
            Alert.alert(
                "Empty category",
                "Please enter a category",
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else {
            let postPayload: newsFeedPayloads.postGeneralMessagePayloadType = {
                username: "TM15ABI",
                rank: 2,
                category: this.state.category,
                location: this.state.location,
                message: this.state.message,
                date: new Date().getTime(),
            };
            let payload = newsFeedPayloads.createPostGeneralMessagePayload(postPayload);
            newsFeedActions.postAction(payload)(this.props.dispatch);
        }
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.1 }}
                colors={[colors.General.whiteColor, colors.General.appGradientPrimary, colors.General.appPrimary]}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>

                        <View style={styles.pickerViewStyle}>
                            <Picker
                                selectedValue={this.state.location}
                                onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}
                                prompt={strings.location} // Android
                                placeholder={strings.location} //iOS
                                style={styles.pickerStyle}
                                // text shown on picker
                                textStyle={styles.pickerTextStyle}
                                // text shown on picker list items
                                itemTextStyle={styles.pickerItemTextStyle}
                                itemStyle={styles.pickerItemStyle}
                            >

                                <Picker.Item label="Timis" value="TM" />
                                <Picker.Item label="Bihor" value="BH" />
                                <Picker.Item label="Arad" value="AR" />
                                <Picker.Item label="Gorj" value="GJ" />
                                <Picker.Item label="Cluj" value="CJ" />
                                <Picker.Item label="Iasi" value="IS" />
                                <Picker.Item label="Brasov" value="BV" />
                                <Picker.Item label="Timis" value="TM" />
                                <Picker.Item label="Bihor" value="BH" />
                                <Picker.Item label="Arad" value="AR" />
                                <Picker.Item label="Gorj" value="GJ" />
                                <Picker.Item label="Cluj" value="CJ" />
                                <Picker.Item label="Iasi" value="IS" />
                                <Picker.Item label="Brasov" value="BV" />
                                <Picker.Item label="Timis" value="TM" />
                                <Picker.Item label="Bihor" value="BH" />
                                <Picker.Item label="Arad" value="AR" />
                                <Picker.Item label="Gorj" value="GJ" />
                                <Picker.Item label="Cluj" value="CJ" />
                                <Picker.Item label="Iasi" value="IS" />
                                <Picker.Item label="Brasov" value="BV" />
                            </Picker>
                        </View>


                        <View style={styles.pickerViewStyle}>
                            <Picker
                                selectedValue={this.state.category}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                                placeholder={strings.category}
                                prompt={strings.category}
                                style={styles.pickerStyle}
                                // text shown on picker
                                textStyle={styles.pickerTextStyle}
                                // text shown on picker list items
                                itemTextStyle={styles.pickerItemTextStyle}
                                itemStyle={styles.pickerItemStyle}
                            >
                                <Picker.Item label="Accident" value="ACC" />
                                <Picker.Item label="Radar" value="RAD" />
                                <Picker.Item label="Politie" value="PLT" />
                                <Picker.Item label="Trafic" value="TRF" />
                                <Picker.Item label="General" value="GNL" />
                            </Picker>
                        </View>

                        <CustomBigTextInput
                            width={300}
                            height={200}
                            style={{ marginTop: 30 }}
                            borderRadius={5}
                            placeholder={strings.message}
                            onChangeText={text =>
                                this.setState({
                                    ...this.state,
                                    message: text
                                })
                            }
                            value={this.state.message}
                            maxLength={400}
                        />

                        <CustomButton
                            width={300}
                            height={45}
                            buttonColor={colors.General.appSecondary}
                            pressedColor={colors.General.appSecondary}
                            buttonTitle={strings.send.toUpperCase()}
                            style={{ marginTop: 30 }}
                            borderRadius={5}
                            onPress={() => {
                                Keyboard.dismiss()
                                this.validatePostDetails()
                            }}
                        />




                        {typeof this.props.postReducer !== 'undefined' && this.props.postReducer != null && this.props.postReducer.isInProgress ? (
                            <View style={{
                                marginTop: 40,
                                marginBottom: -50,
                                backgroundColor: 'transparent',
                            }}>
                                <LinesLoader
                                    color='rgba(169, 20, 20, 0.9)'
                                    barHeight={60}
                                    barWidth={5}
                                    betweenSpace={5}
                                />
                            </View>
                        ) : (
                                <View style={{ height: 50, backgroundColor: "transparent" }} />
                            )}

                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        marginRight: "40%",
        marginTop: 20,
        marginBottom: 10,
    },
    headerText: {
        marginTop: 10,
        fontSize: 18,
        color: "#555",
        marginBottom: 5,
    },
    pickerStyle: {
        width: 285,
    },
    pickerTextStyle: {
        color: colors.General.blackColor,
    },
    pickerItemStyle: {
        paddingLeft: 20,
        marginLeft: 0,
        borderBottomColor: colors.General.blackColor,
        borderTopColor: colors.General.blackColor
    },
    pickerItemTextStyle: {
        fontSize: 16,
    },
    pickerViewStyle: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "transparent",
        overflow: "hidden",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingLeft: Platform.OS == "ios" ? 0 : 10,
        marginTop: 30,

    }
});

function mapStateToProps(state) {
    return {
        postReducer: state.postReducer
    };
}

export default connect(mapStateToProps)(PostPage);