import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import FavouriteDetails from '../FavouriteDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function FavouriteTab() {
  const [favPokemon, setFavPokemon] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('fav_pokemon');
      setFavPokemon(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      // error reading value
    }
  };

  useFocusEffect(() => {
    getData();
  });

  const hasFavouritePokemon = favPokemon !== null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hasFavouritePokemon ? (
        <FavouriteDetails favPokemon={favPokemon}></FavouriteDetails>
      ) : (
        <Text>You currrently don't have favourite pokemon.</Text>
      )}
    </View>
  );
}

export default FavouriteTab;
