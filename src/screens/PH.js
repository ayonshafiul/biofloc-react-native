import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Alert,
  Button,
  RefreshControl,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {useStore} from '../hooks/useStore';
import {LineChart} from 'react-native-chart-kit';
import {Slider} from '@miblanchard/react-native-slider';
import styles from '../styles/styles';
import {Switch} from '@react-native-material/core';

const PH = () => {
  const data = useStore(state => state.data);
  const chartData = useStore(state => state.chartData);
  const chartLabels = useStore(state => state.chartLabels);
  const [sliderValue, setSliderValue] = useState([data["pH_target"]]);

  const refreshChartData = useStore(state => state.refreshChartData);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshChartData();
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.viewContainer}>
          <Text style={styles.textHeader}>Current pH: {data.pH}</Text>
          <Text style={styles.textSubHeader}>Set pH value: {sliderValue}</Text>
          <Slider
            value={sliderValue}
            onValueChange={value => setSliderValue(value)}
            minimumValue={0}
            maximumValue={14}
            step={1}
          />
          <Button
            title="Set Value"
            onPress={() => {
              const reference = firebase
                .app()
                .database(
                  'https://biofloc-automation-default-rtdb.asia-southeast1.firebasedatabase.app',
                )
                .ref('test');
                reference.update({
                  "pH_target": sliderValue[0]
                })
            }}
          />
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Acid Compound </Text>
            <Switch
              value={data['acid_compound_status']}
              onValueChange={() => {}}
            />
          </View>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Alcali Compound </Text>
            <Switch
              value={data['alcali_compound_status']}
              onValueChange={() => {}}
            />
          </View>
          <Text style={styles.textSubHeader}>pH History</Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Chart chartLabels={chartLabels} chartData={chartData} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const Chart = React.memo(({chartLabels, chartData}) => (
  <LineChart
    data={{
      labels: chartLabels,
      datasets: [
        {
          data: chartData.map(data => data['pH']),
        },
      ],
    }}
    width={Dimensions.get('window').width + Dimensions.get('window').width} // from react-native
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

export default PH;
