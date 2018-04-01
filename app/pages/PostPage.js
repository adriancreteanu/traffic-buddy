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
    TouchableWithoutFeedback
} from 'react-native';

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
                userRank: 2,
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
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

function mapStateToProps(state) {
    return {
        postReducer: state.postReducer
    };
}

export default connect(mapStateToProps)(PostPage);