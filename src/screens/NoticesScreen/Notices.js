import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import styles from "./styles";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const rootRef = firebase.database().ref();
const notiRef = rootRef.child("notifications/");

export default class FacilityStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: [],
    };
  }

  componentDidMount() {
    const notices = [];
    try {
      notiRef.orderByChild("time").once("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          const vals = Object.keys(cls).map((key) => cls[key]);
          vals.forEach((val) => {
            const c1 = [val.time, val.title, val.body];
            notices.push(c1);
          });
          this.setState({
            notices: notices,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  renderNotices = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.notificationTime}>{item[0]}</Text>
      <Text style={styles.notificationTitle}>{item[1]}</Text>
      <Text style={styles.notificationBody}>{item[2]}</Text>
    </View>
  );

  render() {
    const data = this.state.notices;
    return (
      <SafeAreaView style={styles.notiContainer}>
        <Text style={styles.h1}>NOTICES</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={data}
          renderItem={this.renderNotices}
          keyExtractor={(item, index) => `${index}`}
        />
      </SafeAreaView>
    );
  }
}
