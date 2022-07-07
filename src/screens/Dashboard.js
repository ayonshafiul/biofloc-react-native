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

import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
const logRef = firestore().collection('logs');
import {useStore} from '../hooks/useStore';
import messaging from '@react-native-firebase/messaging';

const Dashboard = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chaertLabels, setChartLabels] = useState([]);

  const refreshData = useStore(state => state.refreshData);
  useEffect(() => {
    const reference = firebase
      .app()
      .database(
        'https://biofloc-automation-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('test');
    reference.on('value', snapshot => {
      setData(snapshot.val());
    });
  }, []);
  useEffect(() => {
    refreshData();
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
              <Text style={styles.textFocus}>{data.temperature} °C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('tds')}>
              <Text style={styles.text}>TDS</Text>
              <Text style={styles.textFocus}>{data.TDS}</Text>
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
              onPress={() => navigation.navigate('ph')}>
              <Text style={styles.text}>pH</Text>
              <Text style={styles.textFocus}>{data.pH}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, {flex: 1 / 3}]}
              onPress={() => navigation.navigate('ph')}>
              <Text style={styles.text}>pH</Text>
              <Text style={styles.textFocus}>{data.pH}</Text>
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
              <Text style={styles.text}>Distance</Text>
              <Text style={styles.textFocus}>{data.distance} cm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 6,
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#e26a00',
    flex: 1 / 2,
    margin: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: 3, height: 2},
  },
  text: {
    color: '#1f1f1f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textFocus: {
    color: 'white',
    marginTop: 10,
    fontSize: 24,
  },
});

export default Dashboard;
