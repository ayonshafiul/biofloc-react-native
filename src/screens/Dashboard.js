import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import styles from '../styles/styles';

import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
const logRef = firestore().collection('logs');
import {useStore} from '../hooks/useStore';
import messaging from '@react-native-firebase/messaging';

const Dashboard = ({navigation, route}) => {
  const data = useStore(state => state.data);
  const refreshChartData = useStore.getState().refreshChartData;
  const chartData = useStore.getState().chartData;

  // set realtime updates for values
  useEffect(() => {
    const reference = firebase
      .app()
      .database(
        'https://biofloc-automation-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('test');
    reference.on('value', snapshot => {
      useStore.setState({data: snapshot.val()});
    });
  }, []);

  // refresh chart Data on initial load
  useEffect(() => {
    refreshChartData();
  }, []);

  // subscribe to alerts when the app is in focus
  // might be annoying if the user gets too many notifications

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert(remoteMessage.notification.body);
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View style={{flex: 1}}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.box, {flex: 2 / 3}]}
              onPress={() => navigation.navigate('temperature')}>
              <Text style={styles.text}>Temperature</Text>
              <Text style={styles.textFocus}>{data.temperature} °c</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('tds')}>
              <Text style={styles.text}>TDS</Text>
              <Text style={styles.textFocus}>{data.tds}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('ph')}>
              <Text style={styles.text}>pH</Text>
              <Text style={styles.textFocus}>{data.pH}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('do')}>
              <Text style={styles.text}>DO</Text>
              <Text style={styles.textFocus}>{data.do} mg/L</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('ammonia')}>
              <Text style={styles.text}>Ammonia</Text>
              <Text style={styles.textFocus}>
                {(Math.pow(10, Number(data.pH)) /
                  (Math.exp(6344 / (273 + Number(data.temperature))) +
                    Math.pow(10, Number(data.pH)))).toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('turbidity')}>
              <Text style={styles.text}>Turbidity</Text>
              <Text style={styles.textFocus}>{data.turbidity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 2 / 3}]}
              onPress={() => navigation.navigate('distance')}>
              <Text style={styles.text}>Water Level</Text>
              <Text style={styles.textFocus}>{data.distance} cm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
