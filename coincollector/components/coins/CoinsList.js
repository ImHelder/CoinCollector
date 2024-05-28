import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CoinsList = ({ coins, onRefresh, loading, initializeDB, resetDB }) => {
  const rarityOptions = [
    { label: 'Commune', value: 'common' },
    { label: 'Rare', value: 'rare' },
    { label: 'Très Rare', value: 'extremely-rare' },
    { label: 'Unique', value: 'unique' },
  ];

  const renderCoinItem = ({ item }) => (
    <View style={styles.coinItem} key={item.id}>
        <Carousel
          width={100}
          height={100}
          data={item.images}
          scrollAnimationDuration={50}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.coinImage} />
          )}
        />   
        <View style={styles.coinDetails}>
          <Text style={styles.coinYear}>{item.year}</Text>
          <Text style={styles.coinRarity}>{rarityOptions.find((rare) => item.rarity === rare.value)?.label || item.rarity}</Text>
          <Text style={styles.coinQuantity}>Quantité : {item.quantity}</Text>
          <Text style={styles.coinValue}>Valeur : {item.value} €</Text>
          <Text style={styles.coinDescription}>{item.description}</Text>
          <Text style={styles.coinAddedAt}>Ajoutée le : {new Date(item.addedAt)?.toLocaleDateString("fr")}</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => initializeDB()}>
          <Text style={styles.buttonText}>Initialize DB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => resetDB()}>
          <Text style={styles.buttonText}>Reset DB</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={coins}
        renderItem={renderCoinItem}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.coinsList}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  coinsList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coinImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 40,
  },
  coinDetails: {
    flex: 2,
  },
  coinYear: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coinRarity: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  coinQuantity: {
    fontSize: 14,
    marginBottom: 3,
  },
  coinValue: {
    fontSize: 14,
    marginBottom: 3,
  },
  coinDescription: {
    fontSize: 14,
    marginBottom: 3,
  },
  coinAddedAt: {
    fontSize: 12,
    color: 'gray',
  },
  container: {
    marginVertical: 20,
    marginBottom: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CoinsList;