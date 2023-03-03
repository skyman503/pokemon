import { AlignVerticalBottom, BorderLeft } from '@mui/icons-material';
import * as React from 'react';
import { Image, Text, View, StyleSheet, Button } from 'react-native';
import { storeData } from './tabs/List';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
  capitalName: {
    fontSize: 30,
    fontWeight: '800',
  },
  typeNameBackground: {
    backgroundColor: '#3E948E',
    borderColor: '#3E948E',
    borderRadius: 30,
    borderWidth: 10,
  },
  typeNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  middleDataColumn: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
});

function renderTypesRow(types) {
  return types.map((item, i) => {
    return (
      <View key={i} style={styles.typeNameBackground}>
        <Text style={styles.typeNameText}>{item.type.name}</Text>
      </View>
    );
  });
}

function getPrimaryMove(moves) {
  return moves[0].move.name;
}

function getSecondaryMove(moves) {
  return moves[1].move.name;
}

function FavouriteDetails(props) {
  const favPokemon = props.favPokemon.pokemon;
  console.log(favPokemon.moves);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.capitalName}>{favPokemon.name}</Text>
      </View>

      <Image style={styles.tinyLogo} source={{ uri: favPokemon.sprites.front_default }} />
      <View style={{ flexDirection: 'row', gap: 35 }}>{renderTypesRow(favPokemon.types)}</View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <View style={{ alignSelf: 'center', paddingTop: 10 }}>
            <Text style={{ fontWeight: '600' }}>{favPokemon.weight}</Text>
          </View>
          <View style={{ marginTop: 'auto' }}>
            <Text>Weight</Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'column', gap: 10 }, styles.middleDataColumn]}>
          <View style={{ alignSelf: 'center', paddingTop: 10 }}>
            <Text style={{ fontWeight: '600' }}>{favPokemon.height}</Text>
          </View>
          <View style={{ marginTop: 'auto' }}>
            <Text>Height</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontWeight: '600' }}>{getPrimaryMove(favPokemon.moves)}</Text>
          <Text style={{ fontWeight: '600' }}>{getSecondaryMove(favPokemon.moves)}</Text>
          <View style={{ marginTop: 'auto' }}>
            <Text>Moves</Text>
          </View>
        </View>
      </View>

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
