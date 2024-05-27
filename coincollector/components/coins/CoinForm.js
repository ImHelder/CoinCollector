import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CoinForm = ({ coin, handleChange }) => {
    const rarityOptions = [
        { label: 'Commune', value: 'common' },
        { label: 'Rare', value: 'rare' },
        { label: 'Très Rare', value: 'extremely_rare' },
        { label: 'Unique', value: 'unique' },
      ];

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Year"
                value={coin.year}
                onChangeText={(value) => handleChange('year', value)}
            />
            <View style={styles.pickerContainer}>
                <Picker
                style={styles.picker}
                selectedValue={coin.rarity}
                onValueChange={(value) => handleChange('rarity', value)}
                mode="dropdown"
                prompt="Sélectionner la rareté"
                >
                <Picker.Item label="Sélectionnez la rareté" value="" style={styles.pickerPlaceholder} />
                {rarityOptions.map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={coin.quantity}
                onChangeText={(value) => handleChange('quantity', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Value"
                value={coin.value}
                onChangeText={(value) => handleChange('value', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input, styles.description]}
                placeholder="Description"
                value={coin.description}
                onChangeText={(value) => handleChange('description', value)}
                multiline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#ffffff',
    },
    description: {
      padding: 10,
      height: 100,
      textAlignVertical: 'top',
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
  });


export default CoinForm;