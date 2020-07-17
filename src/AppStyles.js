import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../src/data/colors";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

// item size
const FACILITY_ITEM_HEIGHT = 150;
const FACILITY_ITEM_MARGIN = 20;

// 1 photo per width
export const FacilityCard = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  facilityContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    margin: 10,
  },
  optionsContainer: {
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: 10,
    marginTop: 20,
  },
  facility: {
    flex: 1,
    width: SCREEN_WIDTH / 2 - 100,
    height: FACILITY_ITEM_HEIGHT - 20,
    margin: 10,
    borderColor: colors.primary3,
    backgroundColor: colors.primary3,
    borderWidth: 1.5,
    borderRadius: 15,
    justifyContent: "center",
    marginTop: 20,
  },
  option: {
    flex: 1,
    flexDirection: "column",
    width: SCREEN_WIDTH / 4 - 100,
    height: 60,
    padding: 4,
    margin: 4,
    backgroundColor: colors.primary3,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  h1: {
    marginTop: 20,
    fontSize: 40,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    marginTop: 20,
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  optionIcon: {
    height: 30,
    width: 30,
  },
  optionTitle: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
