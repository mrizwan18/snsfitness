import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../src/data/colors";
import { color } from "react-native-reanimated";
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
  facilityStatusContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    margin: 10,
    justifyContent: "center",
    marginTop: 50,
    position: "relative",
  },
  facilityStatus: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  facilityStatusTitle: {
    width: "40%",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  facilityStatusColor: {
    width: "24%",
    height: 80,
    margin: 10,
    marginLeft: 0,
    borderColor: colors.black,
    borderWidth: 1,
  },
  facilityStatusText: {
    flexDirection: "column",
    width: "24%",
    height: 80,
    margin: 10,
    marginLeft: -10,
    borderColor: colors.black,
    backgroundColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
  },
  facilityStatusGreen: {
    backgroundColor: "green",
  },
  facilityStatusAmber: {
    backgroundColor: colors.amber,
  },
  facilityStatusRed: {
    backgroundColor: "red",
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
    fontFamily: "Roboto",

    textAlign: "center",
    color: colors.white,
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  h1: {
    fontSize: 40,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  h2: {
    marginTop: 20,
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  h3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  h4: {
    fontSize: 12,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: "Roboto",

    marginRight: 30,
  },
  optionIcon: {
    height: 30,
    width: 30,
  },
  optionTitle: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    fontFamily: "Roboto",

    fontSize: 16,
    textTransform: "uppercase",
  },
  loading: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: colors.white,
  },

  tableHeader: {
    height: 80,
    backgroundColor: colors.primary3,
  },
  tableHeaderName: {
    height: 100,
    backgroundColor: colors.primary0,
    width: SCREEN_WIDTH,
  },
  tableText: {
    textAlign: "center",
    fontWeight: "100",
  },
  tableTextHeaderName: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",

    fontSize: 36,
    color: colors.white,
  },
  tableTextHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",

    color: colors.white,
  },
  tableDataWrapper: {
    marginTop: -1,
    marginBottom: 20,
  },
  tableRow: {
    height: 40,
    backgroundColor: "#E7E6E1",
  },
  notiContainer: {
    flex: 1,
    alignItems: "center",
  },
  notification: {
    borderRadius: 15,
    backgroundColor: colors.primary3,
    padding: 14,
    margin: 8,
    width: SCREEN_WIDTH - 50,
    flex: 1,
    position: "relative",
  },
  notificationTime: {
    // position: "absolute",
    // left: 15,
    // top: 10,
    color: colors.white,
    fontWeight: "200",
    fontFamily: "Roboto",
  },
  notificationTitle: {
    // position: "absolute",
    // left: 15,
    // top: 50,
    color: colors.white,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  notificationBody: {
    // position: "absolute",
    // left: 15,
    // top: 70,
    color: colors.white,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  formContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 5,
    flexWrap: "wrap",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary3,
    color: "white",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: "Roboto",
  },
  timingContainer: {
    flex: 1,
    flexDirection: "row",
    width: SCREEN_WIDTH - 100,
    justifyContent: "space-around",
    margin: 10,
    marginTop: 0,
    alignItems: "center",
    height: 100,
  },
  mapContainer: {
    flex: 5,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
});
