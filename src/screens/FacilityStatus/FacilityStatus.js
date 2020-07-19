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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    const data = item == 1 ? facilityStatus.men : facilityStatus.ladies;
    this.state = {
      traffic: data,
      id: item,
      loaded: false,
    };
  }

  componentDidMount() {
    if (this.state.id == 2) {
      const tr = this.state.traffic;
      ladiesRef.on("value", (childSnapshot) => {
        const ld = [];
        childSnapshot.forEach((val) => {
          ld.push(val.node_.value_);
        });

        for (let i = 0; i < tr.length; i++) {
          tr[i].traffic = ld[i];
        }
        this.setState({
          traffic: tr,
          loaded: true,
        });
      });
    } else {
      const tr = this.state.traffic;
      menRef.on("value", (childSnapshot) => {
        const ld = [];
        childSnapshot.forEach((val) => {
          ld.push(val.node_.value_);
        });
        for (let i = 0; i < tr.length; i++) {
          tr[i].traffic = ld[i];
        }
        this.setState({
          traffic: tr,
          loaded: true,
        });
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

  decideColor = (num) => {
    if (num >= 1 && num <= 10) return styles.facilityStatusGreen;
    if (num >= 11 && num <= 20) return styles.facilityStatusAmber;
    if (num > 20) return styles.facilityStatusRed;
  };

  decideStatus = (num) => {
    if (num >= 1 && num <= 10) return "Open";
    if (num >= 11 && num <= 20) return "Moderate";
    if (num > 20) return "Closed";
  };

  renderStatus = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.facilityStatus}>
        <Text style={styles.facilityStatusTitle}>{item.title}</Text>
        <View
          style={[styles.facilityStatusColor, this.decideColor(item.traffic)]}
        ></View>
        <View style={styles.facilityStatusText}>
          <Text style={styles.h3}>{this.decideStatus(item.traffic)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
        <View style={styles.facilityStatusContainer}>
          <Text style={styles.h4}>Green: 1-10, Amber: 11-20, Red: 20+</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={data}
            renderItem={this.renderStatus}
            keyExtractor={(item) => `${item.statusId}`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
