const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);


exports.sendPushNotification = functions.database
    .ref("/threads/{thread_id}/messages/{message_id}")
    .onWrite(event => {
        var after = event.after;
        let message = after._data.text;
        let sender_id = after._data.user._id;

        const getParticipants = after.ref.parent.ref.parent.child("participants").once('value');
        const getReceiverToken = (receiver_location, receiver_id) => admin.database().ref(`users/${receiver_location}/${receiver_id}/pushToken`).once('value');

        return getParticipants.then(snapshot => {

            // Retrive the participants
            let participants = snapshot.val();
            let user1 = _.values(participants)[0];
            let user2 = _.values(participants)[1];

            // Verify who is the receiver
            let receiver_id = sender_id === user1 ? String(user2) : String(user1);

            // Calculate user location in database
            var receiver_location = receiver_id.substring(0, 2);

            // Verification for Bucharest
            if (!isNaN(receiver_location.charAt(1))) {
                receiver_location = receiver_id.charAt(0);
            }

            return Promise.all([snapshot, getReceiverToken(receiver_location, receiver_id)]);
        })

            .then(results => {
                let receiver_token = results[1].val();

                // Create the notification payload
                const payload = {
                    notification: {
                        title: sender_id,
                        body: message,
                        sound: 'default',
                    }
                };

                // Send the notification
                return admin.messaging()
                    .sendToDevice(receiver_token, payload);
            })
            .catch(error => {
                console.log(error);
            })

    });

