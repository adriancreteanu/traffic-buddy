import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView, 
} from 'react-native';

import CustomTextInput from "./CustomTextInput";
import FancyTextInput from "./FancyTextInput";

import { strings } from "../common/localization/strings-repository";
import * as colors from "../styles/Colors";

class UserProfileData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fabricationYear: "",
        }

    }

    render() {
        return (
            <ScrollView 
                style={[styles.container, { flex: this.props.containerFlex }]}
                
                >

                <Text style={styles.subtitle}>
                    {strings.personalInfoLabel.toUpperCase()}
                </Text>

                <FancyTextInput
                    width={'80%'}
                    height={60}
                    style={{ marginTop: 0 }}
                    onChangeText={() => { }

                    }
                    value={"Decebal Popescu"}
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
                    width={'80%'}
                    height={60}
                    style={{ marginTop: 0 }}
                    onChangeText={() => { }

                    }
                    value={"decebal.popescu@gmail.com"}
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

                <Text style={styles.subtitle}>
                    {strings.carInfoLabel.toUpperCase()}
                </Text>

                <FancyTextInput
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"Audi"}
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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"Q8"}
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
                    width={'80%'}
                    height={65}
                    onChangeText={(text) => { 
                        this.setState({
                            fabricationYear: text
                        })
                    }

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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"1.8"}
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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"4"}
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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"Gas"}
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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"144"}
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
                    width={'80%'}
                    height={60}
                    onChangeText={() => { }

                    }
                    value={"Hatchback"}
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

            </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginLeft: 20,
        marginBottom: 40,
    },
    subtitle: {
        marginTop: 40,
        fontSize: 20,
        textAlign: 'left',
        //backgroundColor: '#F00', 
        fontWeight: 'bold',
        width: 200,
        paddingLeft: 5,
        color: colors.General.blackColor,
    }
});


export default UserProfileData;