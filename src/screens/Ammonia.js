import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  RefreshControl
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useStore} from '../hooks/useStore';
import {LineChart} from 'react-native-chart-kit';

const Ammonia = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const chartData = useStore(state => state.chartData);
  const chartLabels = useStore(state => state.chartLabels);
  const refreshData = useStore(state => state.refreshData);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View>
          <Text>Ammonia History</Text>
          <LineChart
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartData.map(data => data['ammonia']),
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Ammonia;
