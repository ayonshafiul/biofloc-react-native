import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useStore} from '../hooks/useStore';
import {LineChart} from 'react-native-chart-kit';
import {Slider} from '@miblanchard/react-native-slider';


const DO = () => {
  const chartData = useStore(state => state.chartData);
  const chartLabels = useStore(state => state.chartLabels);
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Dissolved Oxygen History</Text>
          <Text>{sliderValue}</Text>
          <Slider
              value={sliderValue}
              onValueChange={value => setSliderValue(value)}
              minimumValue={0}
              maximumValue={60}
              step={1}
            />
          <Chart chartLabels={chartLabels} chartData={chartData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

const Chart = React.memo(({chartLabels, chartData}) => (
  <LineChart
    data={{
      labels: chartLabels,
      datasets: [
        {
          data: chartData.map(data => data['do']),
        },
      ],
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    }}
    bezier
    style={{
      margin: 8,
      borderRadius: 16,
    }}
  />
));

export default DO;
