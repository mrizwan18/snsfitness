import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import styles from "./styles";
import { facilityStatus } from "../../data/dataArrays";
import { colors } from "../../data/colors";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";

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
const ladiesRef = rootRef.child("traffic/ladies");
const menRef = rootRef.child("traffic/men");

export default class FacilityStatus extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    const data = item == 1 ? facilityStatus.men : facilityStatus.ladies;
    this.state = {
      traffic: data,
      facilities: [],
      id: item,
      loaded: false,
      updatedAt: "",
    };
  }

  componentDidMount() {
    if (this.state.id == 2) {
      const tr = [];
      let facilities = [];
      let time = "";
      ladiesRef.once("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          const vals = Object.keys(cls).map((key) => {
            return cls[key];
          });
          vals.forEach((val, index) => {
            if (index < vals.length - 1) {
              const t1 = [val.status, val.color];
              if (val.name.toLowerCase().includes("gym") && index != 0) {
                console.log("yes");
                let x1 = tr[0];
                tr[0] = t1;
                tr.push(x1);
                let x2 = facilities[0];
                facilities[0] = val.name;
                facilities.push(x2);
              } else {
                tr.push(t1);
                facilities.push(val.name);
              }
            } else time = val;
          });
          this.setState({
            traffic: tr,
            loaded: true,
            facilities: facilities,
            updatedAt: time,
          });
        }
      });
    } else {
      const tr = [];
      let facilities = [];
      let time = "";
      menRef.once("value", (childSnapshot) => {
        const cls = childSnapshot.val();
        if (cls != null) {
          const vals = Object.keys(cls).map((key) => {
            return cls[key];
          });
          vals.forEach((val, index) => {
            if (index < vals.length - 1) {
              const t1 = [val.status, val.color];
              if (val.name.toLowerCase().includes("gym") && index != 0) {
                console.log("yes");
                let x1 = tr[0];
                tr[0] = t1;
                tr.push(x1);
                let x2 = facilities[0];
                facilities[0] = val.name;
                facilities.push(x2);
              } else {
                tr.push(t1);
                facilities.push(val.name);
              }
            } else time = val;
          });
          this.setState({
            traffic: tr,
            loaded: true,
            facilities: facilities,
            updatedAt: time,
          });
        }
      });
    }
  }

  renderStatus = ({ item, index }) => (
    <View style={styles.facilityStatus} key={index}>
      <Text style={styles.facilityStatusTitle}>
        {this.state.facilities[index]}
      </Text>
      <View
        style={[
          styles.facilityStatusColor,
          { backgroundColor: colors[item[1].toLowerCase()] },
        ]}
      ></View>
      <View style={styles.facilityStatusText}>
        <Text style={styles.h3}>{item[0]}</Text>
      </View>
    </View>
  );

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.loading}>
          <Image source={require("../../../assets/loading.gif")} />
        </View>
      );
    }

    const data = this.state.traffic;
    const title =
      "Live " + (this.state.id == 1 ? "Men's" : "Ladies") + " Facilities";
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>{title}</Text>
        <Text style={styles.h3}>Last Updated At: {this.state.updatedAt}</Text>
        <View style={styles.facilityStatusContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={data}
            renderItem={this.renderStatus}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
