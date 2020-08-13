import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/Home/HomeScreen";
import FacilityStatus from "../screens/FacilityStatus/FacilityStatus";
import Classes from "../screens/Classes/Classes";
import Notices from "../screens/NoticesScreen/Notices";
import Register from "../screens/Registration/Register";
import OpeningTimes from "../screens/Timings/OpeningTimes";
import FootballTime from "../screens/Football/FootballTime.js";

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    FacilityStatus: FacilityStatus,
    Classes: Classes,
    Notices: Notices,
    Register: Register,
    Times: OpeningTimes,
    Football: FootballTime,
  },
  {
    initialRouteName: "Home",
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
    }),
  }
);
const DrawerStack = createDrawerNavigator({
  Main: MainNavigator,
});
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
