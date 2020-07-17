import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import styles from "./styles";
import { facilities, options } from "../../data/dataArrays";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
  });

  constructor(props) {
    super(props);
  }

  renderFacilities = ({ item }) => (
    <View style={styles.facility}>
      <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.title}>{item.title}</Text>
      </TouchableHighlight>
    </View>
  );
  renderOptions = ({ item }) => (
    <View style={styles.option}>
      <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.optionTitle}>{item.title}</Text>
      </TouchableHighlight>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>WELCOME</Text>
        <Text style={styles.h2}>Live Facilities Status</Text>
        <View style={styles.facilityContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={facilities}
            renderItem={this.renderFacilities}
            keyExtractor={(item) => `${item.facilityId}`}
          />
        </View>
        <View style={styles.optionsContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={options}
            renderItem={this.renderOptions}
            keyExtractor={(item) => `${item.optionId}`}
          />
        </View>
      </View>
    );
  }
}
