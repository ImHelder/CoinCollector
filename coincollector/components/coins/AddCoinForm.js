import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { addCoin, getData, saveData } from '@/db/database';
import CoinForm from './CoinForm';

const AddCoinForm = () => {
  const [coin, setCoin] = useState({
    year: '',
    rarity: '',
    quantity: '',
    value: '',
    description: '',
    image: null,
  });
  const [coins, setCoins] = useState([]); 
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleChange = (name, value) => {
    setCoin({ ...coin, [name]: value });
  };

  const handleSelectCoin = (coinId) => {
    const coin = coins.find((c) => c.id === coinId);
    setSelectedCoin(coin);
  };

  const handleAddCoin = async () => {

    if (selectedCoin) {
        const updatedCoins = coins.map((c) => {
          if (c.id === selectedCoin.id) {
            return { ...coin, quantity: parseInt(c.quantity) + 1, image: coin.image || c.image};
          }
          return coin;
        });
        await saveData('coins', updatedCoins);
        setCoins(updatedCoins);
        setSelectedCoin(null);
        setCoin({
          year: '',
          rarity: '',
          quantity: '',
          value: '',
          description: '',
          image: null,
        });
        return true;
    }

    if (
        coin.year.trim() === '' ||
        coin.rarity.trim() === '' ||
        coin.quantity.trim() === '' ||
        coin.value.trim() === ''
      ) {
        alert('Veuillez remplir tout les champs (Année, Rareté, Quantité, Valeur)');
        return;
      }
    
      const parsedQuantity = parseInt(coin.quantity);
      const parsedValue = parseFloat(coin.value);
    
      if (isNaN(parsedQuantity) || isNaN(parsedValue)) {
        alert('Quantité et valeur doivent être des nombres.');
        return;
      }

    const newCoin = {
      id: Date.now(),
      ...coin,
      quantity: parseInt(coin.quantity),
      value: parseFloat(coin.value),
      addedAt: new Date(),
    };
    await addCoin(newCoin);
    setCoin({
      year: '',
      rarity: '',
      quantity: '',
      value: '',
      description: '',
      image: null,
    });
    return true;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('image', result.assets[0].uri);
    }
  };

  const rarityOptions = [
    { label: 'Commune', value: 'common' },
    { label: 'Rare', value: 'rare' },
    { label: 'Très Rare', value: 'extremely-rare' },
    { label: 'Unique', value: 'unique' },
  ];

  useEffect(() => {
    (async () => {
        const coins = await getData('coins');
        setCoins(coins || []);
    })();
  }, []);

  return (
    <View style={styles.container}>

        <Picker
            style={styles.picker}
            selectedValue={selectedCoin ? selectedCoin.id : ''}
            onValueChange={handleSelectCoin}
            mode="dropdown"
            prompt="Sélectionner une pièce existante"
        >
            <Picker.Item label="Nouvelle pièce" value="" style={styles.pickerPlaceholder} />
            {coins.map((coin) => (
                <Picker.Item key={coin.id} label={`${coin.value}€ - ${rarityOptions.find((rare) => rare.value === coin.rarity)?.label || coin.rarity} - ${coin.year}`} value={coin.id} />
            ))}
        </Picker>

        {!selectedCoin && <CoinForm coin={coin} handleChange={handleChange} />}
        
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            {coin.image ? (
            <Image source={{ uri: coin.image }} style={styles.image} />
            ) : (
            <FontAwesome name="camera" size={24} color="#4a90e2" />
            )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.addCoinButton} onPress={handleAddCoin}>
            <Text style={styles.addCoinButtonText}>Ajouter une pièce</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  addCoinButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addCoinButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  pickerPlaceholder: {
    color: 'gray',
  },
  imageButton: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AddCoinForm;