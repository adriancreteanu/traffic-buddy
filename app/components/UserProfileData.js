import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
} from 'react-native';

import CustomTextInput from "./CustomTextInput";
import FancyTextInput from "./FancyTextInput";
import FancyPicker from "./FancyPicker";

import { Picker } from 'native-base';

import { strings } from "../common/localization/strings-repository";
import * as colors from "../styles/Colors";
import CustomButton from './CustomButton';



class UserProfileData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fabricationYear: "",
            location: "",
            user: this.props.user,

            // car data
            brand: this.props.user.car ? this.props.user.car.brand : null,
            model: this.props.user.car ? this.props.user.car.model : null,
            fabricationYear: this.props.user.car && this.props.user.car.fabricationYear ? String(this.props.user.car.fabricationYear) : null,
            engine: this.props.user.car && this.props.user.car.engine ? String(this.props.user.car.engine) : null,
            doors: this.props.user.car && this.props.user.car.doors ? String(this.props.user.car.doors) : null,
            fuel: this.props.user.car ? this.props.user.car.fuel : null,
            horsepower: this.props.user.car && this.props.user.car.horsepower ? String(this.props.user.car.horsepower) : null,
            coupeType: this.props.user.car ? this.props.user.car.coupeType : null,
        }

        

    }

    render() {
        return (
            <ScrollView>
                <View style={[styles.container, { flex: this.props.containerFlex }]} >
                    <Text style={styles.subtitle}>
                        {strings.personalInfoLabel.toUpperCase()}
                    </Text>

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 70 : 80}
                        style={{ marginTop: 0 }}
                        onChangeText={() => { }

                        }
                        value={this.state.user.firstName + " " + this.state.user.lastName}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={false}
                        marginTop={20}
                        hint={strings.name}
                        placeholder={strings.name}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 70 : 80}
                        style={{ marginTop: 0 }}
                        onChangeText={() => { }

                        }
                        value={this.state.user.email}
                        maxLength={40}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={false}
                        marginTop={20}
                        hint={strings.email}
                        placeholder={strings.email}
                    />

                    <FancyPicker
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        borderRadius={5}
                        marginTop={20}
                        placeholder={strings.location}
                        selectedValue={this.state.user.location}
                    />


                    <Text style={styles.subtitle}>
                        {strings.carInfoLabel.toUpperCase()}
                    </Text>

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                brand: text
                            })
                        }
                        value={this.state.brand}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        hint={strings.carBrandHint}
                        placeholder={strings.carBrand}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                model: text
                            })
                        }
                        value={this.state.model}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        hint={strings.carModelHint}
                        placeholder={strings.carModel}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={65}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                fabricationYear: text
                            })
                        }
                        value={this.state.fabricationYear}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        keyboardType={"numeric"}
                        hint={strings.carFabricationYearHint}
                        placeholder={strings.carFabricationYear}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                engine: text
                            })
                        }
                        value={this.state.engine}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        keyboardType={"numeric"}
                        hint={strings.carEngineHint}
                        placeholder={strings.carEngine}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                doors: text
                            })
                        }
                        value={this.state.doors}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        keyboardType={"numeric"}
                        hint={strings.carNumberOfDoorsHint}
                        placeholder={strings.carNumberOfDoors}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                fuel: text
                            })
                        }
                        value={this.state.fuel}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        hint={strings.carFuelHint}
                        placeholder={strings.carFuel}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                horsepower: text
                            })
                        }
                        value={this.state.horsepower}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        keyboardType={"numeric"}
                        hint={strings.carHorsePowerHint}
                        placeholder={strings.carHorsePower}
                    />

                    <FancyTextInput
                        width={'100%'}
                        height={Platform.OS == "ios" ? 60 : 70}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                coupeType: text
                            })
                        }
                        value={this.state.coupeType}
                        maxLength={20}
                        isPassword={false}
                        borderRadius={5}
                        paddingLeft={20}
                        fontSize={16}
                        editable={true}
                        marginTop={20}
                        hint={strings.carCoupeTypeHint}
                        placeholder={strings.carCoupeType}
                    />

                    <CustomButton
                        width={'100%'}
                        height={Platform.OS == "ios" ? 50 : 60}
                        buttonColor={colors.General.appSecondary}
                        pressedColor={colors.General.appSecondaryMono}
                        buttonTitle={strings.update.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => {
                            this.props.updateUserProfileData
                        }}
                        fontSize={18}
                        fontWeight={'bold'}
                        textWidth={150}
                    />

                </View>
            </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40,
    },
    subtitle: {
        marginTop: 40,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        width: 200,
        paddingLeft: 5,
        color: colors.General.blackColor,
    }
});


export default UserProfileData;