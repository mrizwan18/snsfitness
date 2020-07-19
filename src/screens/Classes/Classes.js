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
import BackButton from "../../components/BackButton/BackButton";
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
      tableHead: [
        ["Monday"],
        ["Tuesday"],
        ["Wednesday"],
        ["Thursday"],
        ["Friday"],
        ["Saturday"],
      ],
      tableHeaderIn: ["Time", "Instructor", "Class", "Status"],
      widthArr: [cellWidth, cellWidth, cellWidth, cellWidth],
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    const days = [
      "Monday",
      "Tuseday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const fetchedData = this.state.data;
    days.forEach((day) => {
      this.fetchData(day, fetchedData);
    });
  }

  fetchData(day, fetchedData) {
    const classes = [];
    try {
      classRef.child(day).on("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          const vals = Object.keys(cls).map((key) => cls[key]);
          vals.forEach((val) => {
            const c1 = [val.time, val.instructor, val.class, val.status];
            classes.push(c1);
          });
          fetchedData.push(classes);
          this.setState({
            data: fetchedData,
            loaded: true,
          });
        } else {
          let days = this.state.tableHead;
          days = days.filter(function (value, index, arr) {
            return value != day;
          });
          this.setState({
            tableHead: days,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };

  renderClasses(tableHead, tableData, state) {
    return (
      <SafeAreaView>
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
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.tableText}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
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

    elements = [];
    for (let i = 0; i < data.length; i++) {
      const dt = data[i];
      const day = days[i];
      elements.push(this.renderClasses(day, dt, state));
    }
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>CLASSES</Text>
        <ScrollView>{elements}</ScrollView>
      </View>
    );
  }
}
