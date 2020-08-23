import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
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

  onPressFacility = (item) => {
    this.props.navigation.navigate("FacilityStatus", { item });
  };

  onPressOptions = (item) => {
    this.props.navigation.navigate(item);
  };
  renderFacilities = ({ item }) => (
    <View style={styles.facility}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => this.onPressFacility(item.facilityId)}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableHighlight>
    </View>
  );
  renderOptions = ({ item }) => (
    <View style={styles.option}>
      <TouchableOpacity
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => this.onPressOptions(item.nav)}
      >
        <Text style={styles.optionTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.h1}>WELCOME</Text>
        </View>
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
