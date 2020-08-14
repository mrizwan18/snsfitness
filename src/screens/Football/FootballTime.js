import React from "react";
import { View, Text, Image } from "react-native";
import * as firebase from "firebase";
import { Table, Row, Rows } from "react-native-table-component";

import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

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
const timeRef = rootRef.child("football/");

export default class FootballTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["DAY", "TIME"],
      timings: [],
      loaded: false,
    };
  }

  componentDidMount() {
    const timings = [];
    try {
      timeRef.once("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          const vals = Object.keys(cls).map((key) => cls[key]);
          vals.forEach((val) => {
            const c1 = [val.day, val.time];
            timings.push(c1);
          });
          this.setState({
            timings: timings,
            loaded: true,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.loading}>
          <Image source={require("../../../assets/loading.gif")} />
        </View>
      );
    }
    const state = this.state;

    let title = "";
    if (state.timings.length == 0) title = "There are no slots yet!";
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h2}>{title}</Text>
        <Text style={styles.h1}>FOOTBALL TIMES AVAILABLE</Text>
        <ScrollView style={styles.tableDataWrapper}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.tableHeaderName}
              textStyle={styles.tableTextHeaderName}
            />
            <Rows
              style={styles.tableRow}
              data={state.timings}
              textStyle={styles.h3}
            />
          </Table>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
