import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving data:', error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error getting data:', error);
  }
};

export const addCoin = async (coin) => {
  const coins = await getData('coins');
  if (coins) {
    await saveData('coins', [...coins, ...coin]);
  } else {
    await saveData('coins', [coin]);
  }
}