import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavouriteTab from './tabs/Favourite';
import MapTab from './tabs/Map';
import ListTab from './tabs/List';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Favourite" component={FavouriteTab} />
      <Tab.Screen name="Map" component={MapTab} />
      <Tab.Screen name="Pokedex" component={ListTab} />
    </Tab.Navigator>
  );
}

export default TabBar;
