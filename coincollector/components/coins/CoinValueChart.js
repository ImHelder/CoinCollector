import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CoinValueChart = ({ coins }) => {
  const data = {
    labels: coins.map((coin) => coin.year),
    datasets: [
      {
        data: coins.map((coin) => coin.value),
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width}
      height={220}
      yAxisLabel="$"
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default CoinValueChart;