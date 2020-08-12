import React from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { facilityStatus } from "../../data/dataArrays";
import BackButton from "../../components/BackButton/BackButton";
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
              facilities.push(val.name);
              tr.push(t1);
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
              facilities.push(val.name);
              tr.push(t1);
            } else time = val;
          });
          console.log(facilities, tr, time);
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

  decideColor = (clr) => {
    if (clr.toLowerCase() === "green") return styles.facilityStatusGreen;
    if (clr.toLowerCase() === "amber") return styles.facilityStatusAmber;
    if (clr.toLowerCase() === "red") return styles.facilityStatusRed;
  };

  renderStatus = ({ item, index }) => (
    <View style={styles.facilityStatus}>
      <Text style={styles.facilityStatusTitle}>
        {this.state.facilities[index]}
      </Text>
      <View
        style={[styles.facilityStatusColor, this.decideColor(item[1])]}
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
      "Live " + (this.state.id == 1 ? "Men's" : "Ladies") + " Facility";
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>{title}</Text>
        <Text style={styles.h3}>Last Updated At: {this.state.updatedAt}</Text>
        <View style={styles.facilityStatusContainer}>
          <Text style={styles.h4}>Green: 1-10, Amber: 11-20, Red: 20+</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={data}
            renderItem={this.renderStatus}
            keyExtractor={(item, index) => `${item.statusId}`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
