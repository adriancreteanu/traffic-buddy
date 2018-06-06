const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database
    .ref("/threads/{thread_id}/messages/{message_id}")
    .onWrite(event => {


        var after = event.after;

        let message = after._data.text;
        let user_id = after._data.user._id;

        const payload = {
            notification: {
                title: user_id,
                body: message
            }
        };

        return admin.messaging()
            .sendToDevice("fviFOiEV2ow:APA91bFZPjdRO88yGv_pdGhzcvRydSZQeXdWntcMChTS3GZUkVWQ0X0qf_zt1lZLo_Dxmrt4Px3u0RAO2TEun-p0hLjyE39voJq0LuAFzAbLbhnXoheTUh8nHjOPGybKL9nGlB9cAdrS", payload);


    });
