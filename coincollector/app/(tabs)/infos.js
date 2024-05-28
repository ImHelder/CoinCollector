import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import CoinValueChart from '../../components/coins/CoinValueChart';
import { getData } from '../../db/database';
import { useIsFocused } from '@react-navigation/native';

const Infos = () => {
    const [coins, setCoins] = useState([]);
    const isFocused = useIsFocused();

    const loadCoins = async () => {
        const savedCoins = await getData('coins');
        if (savedCoins) {
          setCoins(savedCoins);
        }
      };
    
      useEffect(() => {
        if(isFocused) loadCoins();
      }, [isFocused]);
      
    return (
        <SafeAreaView>
            <View style={{ height: 900, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {coins.length > 0 && <CoinValueChart coins={coins} />}
            </View>
        </SafeAreaView>
    );
};

export default Infos;