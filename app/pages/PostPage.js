//imports 
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native';

import NavRightIcon from "../components/navigation/NavRightIcon";
import NavLeftIcon from '../components/navigation/NavLeftIcon';
import NavTitleUI from '../components/navigation/NavTitleUI';

// strings
import { strings } from "../common/localization/strings-repository";
import CustomTextInput from '../components/CustomTextInput';
import CustomBigTextInput from '../components/CustomBigTextInput';
import CustomButton from '../components/CustomButton';

class PostPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitleUI title="Post" />,
        headerLeft: <NavLeftIcon
            icon="arrow-left"
            onPress={() => navigation.goBack()}
        />,
        headerRight: <NavRightIcon />,
        headerStyle: {
            backgroundColor: '#c6bf69',
            borderBottomColor: '#FFF',
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

    /* Lifecycle methods */
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            category: "",
            message: "",
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground source={require('../assets/images/post_background.png')} style={styles.container} >

                    <CustomTextInput
                        width={300}
                        height={50}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        placeholder={strings.location}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                location: text
                            })
                        }
                        value={this.state.location}
                        maxLength={20}
                    />

                    <CustomTextInput
                        width={300}
                        height={50}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        placeholder={strings.category}
                        onChangeText={text =>
                            this.setState({
                                ...this.state,
                                category: text
                            })
                        }
                        value={this.state.category}
                        maxLength={20}
                    />

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
                        buttonTitle={strings.send.toUpperCase()}
                        style={{ marginTop: 30 }}
                        borderRadius={5}
                        onPress={() => {
                            //Keyboard.dismiss()
                            //this.validateLoginCredentials()
                        }}
                    />

                </ImageBackground>
            </View>
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
});

export default PostPage;