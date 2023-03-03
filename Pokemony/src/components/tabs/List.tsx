import * as React from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import PokemonInfo from '../PokemonInfo';
import ShowModalContext from '../PokemonDetailsModalContext';

const API_URL = `https://pokeapi.co/api/v2`;
const ENDPOINT = `/pokemon`;

const NUM_POKEMONS = 151;
const LIMIT = 11;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  pokedexRow: {
    width: '100%',
    height: 100,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
  },
  pokedexImage: {
    width: 100,
    height: 100,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function getUrl(limit: number, offset: number) {
  console.log(API_URL + ENDPOINT + `/?limit=${limit}&offset=${offset}`);
  return API_URL + ENDPOINT + `/?limit=${limit}&offset=${offset}`;
}

function getPokemonIdFromPokedexData(data) {
  console.log(data.split('/'));
}

class PokemonInPokedex {
  name: string;
  url: string;
  image: string;

  public constructor(name: string, url: string, image: string) {
    this.name = name;
    this.url = url;
    this.image = image;
  }
}

export const storeData = async (value: PokemonDetails | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('fav_pokemon', jsonValue);
  } catch (e) {
    // saving error
  }
};

function ListTab() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shownAll, setShownAll] = useState(false);
  const [lookUpPokemon, setLookUpPokemon] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const value = { modalVisible, setModalVisible };

  const fetchPokemons = async () => {
    console.log('fetch pokemon');
    if (LIMIT + offset > NUM_POKEMONS) {
      setShownAll(true);
      return;
    }

    fetch(getUrl(LIMIT, offset))
      .then((res) => res.json())
      .then((resJson) => {
        let pokes = [];
        let promises = [];

        resJson.results.forEach((poke) => {
          promises.push(
            fetch(poke.url)
              .then((res) => res.json())
              .then((resJson) => {
                //console.log(resJson);
                const newPoke = new PokemonInPokedex(
                  poke.name,
                  poke.url,
                  resJson.sprites.front_default
                );
                //console.log(newPoke);
                pokes.push(newPoke);
              })
          );
        });

        Promise.all(promises).then(() => {
          setPokemons(pokemons.concat(pokes));
          setIsLoading(false);
        });
      });
  };

  const handleFetchMore = () => {
    console.log('handle more');
    setOffset(offset + LIMIT);
    setIsLoading(true);
  };

  const showDetails = (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        setLookUpPokemon(resJson);
      })
      .then(() => {
        setModalVisible(true);
      });
  };

  useEffect(() => {
    console.log('Use effect', offset);
    setIsLoading(true);
    fetchPokemons();
    return () => {};
  }, [offset]);

  const showFooter = () => {
    return isLoading && !shownAll;
  };

  const renderFooter = () => {
    return showFooter() ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const renderItem = (item) => {
    return (
      <Pressable
        onPress={() => {
          showDetails(item.item.url);
          console.log(item);
        }}
      >
        <View style={styles.pokedexRow}>
          <Image style={styles.pokedexImage} source={{ uri: item.item.image }} />
          <Text>{item.item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
    >
      <ShowModalContext.Provider value={value}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <PokemonInfo pokemon={lookUpPokemon} />
        </Modal>
      </ShowModalContext.Provider>

      <FlatList
        data={pokemons}
        renderItem={renderItem}
        style={{ flex: 1 }}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

export default ListTab;
