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

import { Picker } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import * as colors from "../styles/Colors";

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

// strings
import { strings } from "../common/localization/strings-repository";
import CustomBigTextInput from '../components/CustomBigTextInput';
import CustomButton from '../components/CustomButton';

//helpers
import InputValidationHelper from "../common/helpers/InputValidationHelper";

// redux
import * as newsFeedPayloads from "../common/data/payloads/NewsFeedPayloads";
import * as newsFeedActions from "../common/redux/actions/NewsFeedActions";
import { connect } from 'react-redux';
import { CirclesLoader } from 'react-native-indicator';

// locations
import { locations } from "../common/constants/Locations";
import { categories } from "../common/constants/Categories";

import AlertHelper from "../common/helpers/AlertHelper";

class PostPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title={strings.postPageTitle.toUpperCase()} />,
        headerLeft: <NavLeftIcon
            icon="chevron-left"
            onPress={() => navigation.goBack()}
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
        headerTintColor: '#FFF'
    });

    /* Lifecycle methods */
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            category: categories.General,
            message: "",
            user: null,
            locationsList: locations,
            locationPickerItems: [],
            categoriesList: categories,
            categoriesPickerItems: []
        }
    }

    async componentDidMount() {
        if (this.props.loggedUserReducer.viewModel) {
            await this.setState({
                location: this.props.loggedUserReducer.viewModel.userProfileViewModel.location,
                user: this.props.loggedUserReducer.viewModel.userProfileViewModel,

            });
        }

        this.setState({
            locationPickerItems: this.formatPickerItems(this.state.locationsList),
            categoriesPickerItems: this.formatPickerItems(this.state.categoriesList)
        });
    }

    formatPickerItems(list) {
        return Object.keys(list).map((key, index) => {
            return <Picker.Item key={index} label={key} value={list[key]} />
        });
    }

    validatePostDetails() {
        if (InputValidationHelper.fieldIsEmpty(this.state.location)) {
            AlertHelper.createInfoAlert(strings.emptyLocationAlertTitle, strings.emptyLocationAlertMessage);
        } else if (InputValidationHelper.fieldIsEmpty(this.state.category)) {
            AlertHelper.createInfoAlert(strings.emptyCategoryAlertTitle, strings.emptyCategoryAlertMessage);
        } else if (InputValidationHelper.fieldIsEmpty(this.state.message)) {
            AlertHelper.createInfoAlert(strings.emptyMessageAlertTitle, strings.emptyMessageAlertMessage);
        } else {
            let postPayload: newsFeedPayloads.postGeneralMessagePayloadType = {
                username: this.state.user.username,
                rank: this.state.user.ranking.rank,
                category: this.state.category,
                location: this.state.location,
                message: this.state.message,
                date: new Date().getTime(),
                likes: 0,
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
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled" >

                        <View style={styles.pickerViewStyle}>
                            <Picker
                                selectedValue={this.state.location}
                                onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}
                                prompt={strings.location} // Android
                                placeholder={this.state.location ? this.state.location : strings.location} //iOS
                                style={styles.pickerStyle}
                                // text shown on picker
                                textStyle={styles.pickerTextStyle}
                                // text shown on picker list items
                                itemTextStyle={styles.pickerItemTextStyle}
                                itemStyle={styles.pickerItemStyle}
                            >

                                {this.state.locationPickerItems}
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
                                {this.state.categoriesPickerItems}
                            </Picker>
                        </View>

                        <CustomBigTextInput
                            width={'85%'}
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
                            width={'85%'}
                            height={Platform.OS == 'ios' ? 50 : 60}
                            buttonColor={colors.General.appSecondary}
                            pressedColor={colors.General.appSecondary}
                            buttonTitle={strings.send.toUpperCase()}
                            style={{ marginTop: 30 }}
                            borderRadius={5}
                            onPress={() => {
                                Keyboard.dismiss()
                                this.validatePostDetails()
                            }}
                            fontSize={18}
                        />


                        {this.props.postReducer.isInProgress ? (
                            <View style={{
                                marginTop: 40,

                                backgroundColor: 'transparent',
                            }}>
                                <CirclesLoader
                                    size={60}
                                    color={colors.General.whiteColor}
                                    dotRadius={10}
                                />
                            </View>
                        ) : (
                                <View style={{ height: 50, width: 50, backgroundColor: 'transparent' }} />
                            )}

                    </ScrollView>
                </TouchableWithoutFeedback>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
        width: '95%',
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
        height: Platform.OS == 'ios' ? 50 : 60,
        width: '85%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "transparent",
        //overflow: "hidden",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingLeft: Platform.OS == "ios" ? 0 : 10,
        marginTop: 30,

    }
});

function mapStateToProps(state) {
    return {
        postReducer: state.postReducer,
        loggedUserReducer: state.loggedUserReducer,
    };
}

export default connect(mapStateToProps)(PostPage);