const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database
    .ref("/threads/{threadId}/messages/{messageId}")
    .onCreate(event => {

        // the payload is what will be delivered to the device(s)
        let payload = {
            notification: {
                title: "Titlu",
                body: "Mesaj",
                sound: true,
                badge: false,
            }, 
            pushToken: event.val()
        }

        let deviceToken = event.val()

        return admin.messaging().sendToDevice()
    });
