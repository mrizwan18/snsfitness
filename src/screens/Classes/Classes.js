import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import styles from "./styles";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { Dimensions } from "react-native";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

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
const classRef = rootRef.child("classes");

export default class Classes extends React.Component {
  constructor(props) {
    super(props);
    const cellWidth = SCREEN_WIDTH / 4;
    this.state = {
      tableHead: [],
      tableHeaderIn: ["Time", "Instructor", "Class", "Status"],
      widthArr: [cellWidth, cellWidth, cellWidth, cellWidth],
      data: [],
      loaded: false,
      check: true,
    };
  }

  componentDidMount() {
    rootRef.once("value", (snapshot) => {
      if (!snapshot.hasChild("classes")) {
        this.setState({ loaded: true });
      } else {
        console.log("inside");
      }
    });
    classRef.on("child_added", (childSnapshot) => {
      this.initFetch();
    });
    classRef.on("child_changed", (childSnapshot) => {
      this.initFetch();
    });
    classRef.on("child_removed", (childSnapshot) => {
      this.initFetch();
    });
    this.initFetch();
  }

  initFetch() {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const fetchedData = [];
    let fetchedDays = [];
    days.forEach((day) => {
      this.fetchData(day, fetchedData, fetchedDays);
    });
  }
  fetchData(day, fetchedData, fetchedDays) {
    const classes = [];
    try {
      classRef.child(day).once("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          if (!fetchedDays.includes(day)) fetchedDays.push(day);
          const vals = Object.keys(cls).map((key) => cls[key]);
          vals.forEach((val) => {
            const c1 = [val.time, val.instructor, val.class, val.status];
            classes.push(c1);
          });
          fetchedData.push(classes);
          let tableHeadData = fetchedDays.map((m) => {
            return [m];
          });
          this.setState({
            data: fetchedData,
            loaded: true,
            tableHead: tableHeadData,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  renderClasses(tableHead, tableData, state, index) {
    return (
      <View key={index}>
        <Table>
          <Row
            data={tableHead}
            style={styles.tableHeaderName}
            textStyle={styles.tableTextHeaderName}
          />
        </Table>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              <Row
                data={state.tableHeaderIn}
                widthArr={state.widthArr}
                style={styles.tableHeader}
                textStyle={styles.tableTextHeader}
              />
            </Table>
            <ScrollView style={styles.tableDataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.widthArr}
                    style={[
                      styles.tableRow,
                      { flex: 1 },
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.tableText}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.loading}>
          <Image source={require("../../../assets/loading.gif")} />
        </View>
      );
    }

    const days = this.state.tableHead;
    const data = this.state.data;
    const state = this.state;
    let title = "";
    if (data.length == 0) title = "There are no classes yet!";

    let elements = [];
    for (let i = 0; i < data.length; i++) {
      const dt = data[i];
      const day = days[i];
      elements.push(this.renderClasses(day, dt, state, i));
    }
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h2}>{title}</Text>
        <Text style={styles.h1}>CLASSES</Text>
        <ScrollView>{elements}</ScrollView>
      </SafeAreaView>
    );
  }
}
