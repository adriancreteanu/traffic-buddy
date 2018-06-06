import { Component } from 'react';

import firebase from 'react-native-firebase';

import type { Notification, NotificationOpen } from 'react-native-firebase';

export default class NotificationHelper extends Component {

    async componentDidMount() {

        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // user has permissions
        } else {
            // user doesn't have permission
            try {
                await firebase.messaging().requestPermission();
                // User has authorised
            } catch (error) {
                // User has rejected permissions
            }
        }


        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
        });

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
        });


        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
        }


    }


    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    render() {
        return null;
    }



}