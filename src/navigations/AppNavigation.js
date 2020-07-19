import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/Home/HomeScreen";
import FacilityStatus from "../screens/FacilityStatus/FacilityStatus";

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    FacilityStatus: FacilityStatus,
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
