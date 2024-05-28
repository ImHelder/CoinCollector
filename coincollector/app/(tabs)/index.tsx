import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { getData, saveData } from '../../db/database';
import CoinsList from "../../components/coins/CoinsList";
import mockedCoin from "../../constants/MockedCoins"
import { useIsFocused } from '@react-navigation/native';

export default function Index() {
  const [coins, setCoins] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const loadCoins = async () => {
    const savedCoins = await getData('coins');
    if (savedCoins) {
      setCoins(savedCoins);
    }
  };

  useEffect(() => {
    if (isFocused) loadCoins();
  }, [isFocused]);

  const initializeDB = async () => {
    await saveData('coins', mockedCoin);
    await loadCoins();
  }

  const resetDB = async () => {
    await saveData('coins', []);
    await loadCoins();
  }

  const onRefresh = async () => {
    setLoading(true);
    const savedCoins = await getData('coins');
    if (savedCoins) {
      setCoins(savedCoins);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView>
        <CoinsList coins={coins} onRefresh={onRefresh} loading={loading} initializeDB={initializeDB} resetDB={resetDB} />
    </SafeAreaView>
  );
}