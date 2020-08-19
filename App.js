// import AppContainer from "./src/navigations/AppNavigation";
import HomeScreen from "./src/screens/Home/HomeScreen";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import React from "react";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const rootRef = firebase.database().ref("expoTokens/" + Constants.deviceId);

export default class App extends React.Component {
  componentDidMount() {
    this.registerForPushNotificationsAsync().then((token) => {
      if (typeof token === "undefined" || token == null) return;
      try {
        rootRef.set(token);
      } catch (error) {
        alert(error);
      }
    });

    Notifications.addNotificationReceivedListener(this._handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      this._handleNotificationResponse
    );
  }

  _handleNotification = (notification) => {
    this.props.navigation.navigate("Notices");
  };

  _handleNotificationResponse = (response) => {
    this.props.navigation.navigate("Notices");
  };
  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      console.log(finalStatus);
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("You won't receive any notifications about the SnS Fitness");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  render() {
    return <HomeScreen />;
  }
}
