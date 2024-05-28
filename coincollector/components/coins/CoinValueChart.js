import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CoinValueChart = ({ coins }) => {
  const sortedCoins = coins.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));

  const coinsData = sortedCoins.reduce((acc, coin) => {
    const date = new Date(coin.addedAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateKey = `${month}-${year}`;

    const existingEntry = acc.find(entry => entry.dateKey === dateKey);

    if (existingEntry) {
      existingEntry.value += coin.value * coin.quantity;
      existingEntry.totalValue += coin.value * coin.quantity;
    } else {
      acc.push({
        date: coin.addedAt,
        dateKey: dateKey,
        value: coin.value * coin.quantity,
        totalValue: acc.length === 0 ? coin.value * coin.quantity : acc[acc.length - 1].totalValue + coin.value * coin.quantity,
      });
    }

    return acc;
  }, []);

  const chartData = {
    labels: coinsData.map(entry => {
      const date = new Date(entry.date);
      return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    }),
    datasets: [
      {
        data: coinsData.map(entry => entry.totalValue),
      },
    ],
  };

  console.log("chartData", chartData);

  return (
    <SafeAreaView style={{flex: 1, marginTop: 30}}>
      <Text style={{fontSize: 18, fontWeight: "bold", alignSelf: "center", marginBottom: 30}}>Valeur de votre collection</Text>
       <ScrollView horizontal>
        <View>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width * 1.6}
            height={420}
            yAxisSuffix="€"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "blue",
              backgroundGradientFrom: "blue",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              borderRadius: 16,
              padding: 10
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinValueChart;