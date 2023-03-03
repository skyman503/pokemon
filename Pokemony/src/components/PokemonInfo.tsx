import * as React from 'react';
import { Image, Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { storeData, PokemonDetails } from './tabs/List';
import { useContext } from 'react';
import ShowModalContext from './PokemonDetailsModalContext';
import { AiOutlineClose } from 'react-icons/ai';

const styles = StyleSheet.create({
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
  header: {
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
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

function PokemonInfo(props) {
  const { modalVisible, setModalVisible } = useContext(ShowModalContext);

  const closeModal = () => {
    setModalVisible(false);
  };

  const setAsFavourite = () => {
    storeData({
      name: props.pokemon.name,
      height: props.pokemon.height,
      weight: props.pokemon.weight,
      image: props.pokemon.sprites.front_default,
    });
    closeModal();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
            <Text>X</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={{ uri: props.pokemon.sprites.front_default }} />
          <Text>Name: {props.pokemon.name}</Text>
          <Text>Weight: {props.pokemon.weight}</Text>
          <Text>Height: {props.pokemon.height}</Text>
          <Button
            title="I like this pokemon"
            onPress={async () => {
              setAsFavourite();
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default PokemonInfo;
