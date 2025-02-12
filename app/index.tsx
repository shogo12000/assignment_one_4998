import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Movies from "./Movies";
import SearchResults from "./SearchResults";
import TvShows from "./TvShows";
import { SafeAreaView, View, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function Root() {
  return (
 
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Tab.Navigator>
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen name="Search Results" component={SearchResults} />
          <Tab.Screen name="TV Shows" component={TvShows} />
        </Tab.Navigator>
      </View>
 
  );
}
