import React from "react";
import { View, Text, Image } from "react-native";
import * as firebase from "firebase";
import { Table, Row, Rows } from "react-native-table-component";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import MapView, { Marker } from "react-native-maps";

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
const timeRef = rootRef.child("timings/");

export default class OpeningTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      timings: [],
      tableHead: ["DAY", "TIME"],
      initialRegion: { latitude: 52.630675, longitude: -1.101599 },
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
            const c1 = [val.days, val.time];
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
  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
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
    if (state.timings.length == 0) title = "There are no timings added yet!";
    console.log(state.timings);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h2}>{title}</Text>
        <Text style={styles.h1}>OPENING TIMES</Text>
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

        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 52.630675,
            longitude: -1.101599,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={(ref) => (this.mapView = ref)}
          showsUserLocation={true}
          onMapReady={this.goToInitialLocation.bind(this)}
          initialRegion={this.state.initialRegion}
          followUserLocation={true}
          zoomEnabled={true}
        >
          <Marker
            coordinate={this.state.initialRegion}
            pinColor={"red"} // any color
            title={"SnS Fitness"}
            description={"because your health is precious"}
          />
        </MapView>
      </SafeAreaView>
    );
  }
}
