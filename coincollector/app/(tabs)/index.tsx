import React, { useEffect, useState } from 'react';
import { Button, RefreshControlBase, SafeAreaView, View } from 'react-native';
import { addCoin, getData, saveData } from '../../db/database';
import CoinsList from "../../components/coins/CoinsList";
import mockedCoin from "../../constants/MockedCoins"

export default function Index() {
  const [coins, setCoins] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCoins = async () => {
      const savedCoins = await getData('coins');
      console.log("savedCoins", savedCoins)
      if (savedCoins) {
        setCoins(savedCoins);
      }
    };
    loadCoins();
  }, []);

  useEffect(() => {
    saveData('coins', coins);
  }, [coins]);

  const initializeDB = async () => {
    addCoin([]);
    const savedCoins = await getData('coins');
    if (savedCoins) {
      setCoins(savedCoins);
    }
  }

  const resetDB = async () => {
    await saveData('coins', []);
  }

  const onRefresh = async () => {
    setLoading(true);
    const savedCoins = await getData('coins');
    if (savedCoins) {
      setCoins(savedCoins);
    }
    setLoading(false);
  }

  const RefreshControl = () => {
    return <RefreshControlBase refreshing={loading} onRefresh={onRefresh} />
  }

  return (
    <SafeAreaView>
      <View style={{flex: 1, flexDirection: "row"}}>
        <Button title="Add Coin" onPress={() => initializeDB()} />
        <Button title="Reset" onPress={() => resetDB()} />
      </View>
      <View>
        <CoinsList coins={coins} refreshControl={RefreshControl} />
      </View>
    </SafeAreaView>
  );
}