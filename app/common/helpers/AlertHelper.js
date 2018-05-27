import { Alert } from 'react-native';


class AlertHelper {

    static createInfoAlert(title: string, message: string) {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

}


export default AlertHelper;