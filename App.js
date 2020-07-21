import AppContainer from "./src/navigations/AppNavigation";
import { Notifications, Updates } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import React, { useEffect } from "react";
import * as firebase from "firebase";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD9SutOi8sWvbN5N9AX-h9M-fKHMlJHvL0",
  authDomain: "snsfitness-4afbb.firebaseapp.com",
  databaseURL: "https://snsfitness-4afbb.firebaseio.com",
  projectId: "snsfitness-4afbb",
  storageBucket: "snsfitness-4afbb.appspot.com",
  messagingSenderId: "439732742424",
  appId: "1:439732742424:web:2d6460824fab852e25566d",
  measurementId: "G-JYNKX65MGK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const rootRef = firebase.database().ref("expoTokens/" + Constants.deviceId);

export default function App() {
  useEffect(() => {
    this.getPushNotificationPermissions();
  });

  getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    console.log(finalStatus);

    // Get the token that uniquely identifies this device

    token = await Notifications.getExpoPushTokenAsync();
    rootRef.set(token);
  };

  return <AppContainer />;
}
