//imports
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
} from "react-native";

import { Picker } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from "../styles/Colors";

import { strings } from "../common/localization/strings-repository";

class FancyPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: this.props.selectedValue,
        }
    }

    render() {
        return (

            <View style={[styles.container, {
                width: this.props.width,
                height: this.props.height,
                borderRadius: this.props.borderRadius,
                marginTop: this.props.marginTop,
                marginBottom: this.props.marginBottom
            }]}>
                <Text style={styles.placeholder}>
                    {this.props.placeholder}
                </Text>
                <View
                    style={[
                        this.props.style,
                        {
                            flex: 1,
                            fontSize: 16,
                            borderColor: "transparent",
                            borderWidth: 1,
                            //backgroundColor: '#f00', 
                            marginLeft: 35,
                            paddingBottom: Platform.OS == "ios" ? 10 : 8,
                            //fontWeight: '400',
                            // new line
                            //marginTop: 5,
                            textAlignVertical: 'center',
                            //marginBottom: 20,
                            overflow: "hidden",
                            
                            
                            

                        }
                    ]}>
                    <Picker
                        selectedValue={this.state.location}
                        onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}
                        prompt={strings.locationHint} // Android
                        placeholder={strings.locationHint} //iOS
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

                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    placeholder: {
        marginLeft: 5,
        marginTop: 2,
        padding: 5,
        paddingBottom: 0,
        //paddingBottom: 20, 
        marginRight: 6,
        //paddingRight: 10, 
        alignSelf: 'flex-start',
        //backgroundColor: '#00f',
        fontWeight: '100',
        color: "#222",
        width: 200,
    },
    pickerStyle: {
        width: 250,
        //backgroundColor: colors.General.blueColor
    },
    pickerTextStyle: {
        color: colors.General.blackColor,
        paddingBottom: 20,
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
});


export default FancyPicker;
