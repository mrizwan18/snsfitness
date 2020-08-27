import AppContainer from "./src/navigations/AppNavigation";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import React from "react";
import * as firebase from "firebase";
import * as Sentry from "sentry-expo";
import firebaseConfig from "./config";

Sentry.init({
  dsn:
    "https://a22d4cc60588448d9c9a734bcd7d6caf@o436778.ingest.sentry.io/5398411",
  enableInExpoDevelopment: true,
  debug: true,
});

// Initialize Firebase

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
    Notifications.setBadgeNumberAsync(1);
  };

  _handleNotificationResponse = (response) => {
    Notifications.setBadgeNumberAsync(0).then((res) => {
      this.props.navigation.navigate("Notices");
    });
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
    return <AppContainer />;
  }
}
