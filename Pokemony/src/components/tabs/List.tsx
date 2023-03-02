import * as React from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('fav_pokemon', jsonValue);
  } catch (e) {
    // saving error
  }
};

function ListTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ListTab!</Text>
      <Button
        title="SET FAV"
        onPress={async () => {
          storeData({
            name: 'clefairy',
            height: 6,
            weight: 75,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
          });
        }}
      />
    </View>
  );
}

export default ListTab;
