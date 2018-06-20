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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car ? this.state.user.car.brand : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car ? this.state.user.car.model : null}
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
                        onChangeText={(text) => {
                            this.setState({
                                fabricationYear: text
                            })
                        }

                        }
                        value={this.state.user.car && this.state.user.car.fabricationYear ? String(this.state.user.car.fabricationYear) : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car && this.state.user.car.engine ? String(this.state.user.car.engine) : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car && this.state.user.car.doors ? String(this.state.user.car.doors) : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car ? this.state.user.car.fuel : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car && this.state.user.car.horsepower ? String(this.state.user.car.horsepower) : null}
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
                        onChangeText={() => { }

                        }
                        value={this.state.user.car ? this.state.user.car.coupeType : null}
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