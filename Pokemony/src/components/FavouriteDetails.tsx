import * as React from 'react';
import { Image, Text, View, StyleSheet, Button } from 'react-native';
import { storeData, PokemonDetails } from './tabs/List';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

type FavouriteDetailsProps = {
  favPokemon: PokemonDetails;
};

function FavouriteDetails(props: FavouriteDetailsProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={{ uri: props.favPokemon.image }} />
      <Text>Name: {props.favPokemon.name}</Text>
      <Text>Weight: {props.favPokemon.weight}</Text>
      <Text>Height: {props.favPokemon.height}</Text>
      <Button
        title="I no longer like this pokemon"
        onPress={async () => {
          storeData(null);
        }}
      />
    </View>
  );
}

export default FavouriteDetails;
