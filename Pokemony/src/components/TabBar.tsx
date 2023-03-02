import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavouritesTab from './tabs/Favourites';
import MapTab from './tabs/Map';
import ListTab from './tabs/List';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Favourites" component={FavouritesTab} />
        <Tab.Screen name="Map" component={MapTab} />
        <Tab.Screen name="Pokedex" component={ListTab} />
    </Tab.Navigator>
  );
}

export default TabBar;