import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CoinsList = ({ coins, refreshControl }) => {
  const renderCoinItem = ({ item }) => (
    <View style={styles.coinItem}>
      <Image source={{ uri: item.image }} style={styles.coinImage} />
      <View style={styles.coinDetails}>
        <Text style={styles.coinYear}>{item.year}</Text>
        <Text style={styles.coinRarity}>{item.rarity}</Text>
        <Text style={styles.coinQuantity}>Quantité : {item.quantity}</Text>
        <Text style={styles.coinValue}>Valeur : {item.value} €</Text>
        <Text style={styles.coinDescription}>{item.description}</Text>
        <Text style={styles.coinAddedAt}>Ajoutée le : {new Date(item.addedAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={coins}
      renderItem={renderCoinItem}
      keyExtractor={(item) => item.id?.toString()}
      contentContainerStyle={styles.coinsList}
      refreshControl={refreshControl}
    />
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
    flex: 1,
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
});

export default CoinsList;