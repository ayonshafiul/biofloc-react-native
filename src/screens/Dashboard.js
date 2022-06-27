import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/database';

const Dashboard = ({navigation, route}) => {
  const [data, setData] = useState({});
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View style={{flex: 1}}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("tds")}>
              <Text style={styles.text}>TDS</Text>
              <Text style={styles.textFocus}>{data.TDS}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("temperature")}>
              <Text style={styles.text}>Temperature</Text>
              <Text style={styles.textFocus}>{data.Temperature} °C</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("turbidity")}>
              <Text style={styles.text}>Turbidity</Text>
              <Text style={styles.textFocus}>{data.Turbidity}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("distance")}>
              <Text style={styles.text}>Distance</Text>
              <Text style={styles.textFocus}>{data.distance} cm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.box, {flex: 1}]} onPress={() => navigation.navigate("ph")}>
              <Text style={styles.text}>pH</Text>
              <Text style={styles.textFocus}>{data.pH}</Text>
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
    padding: 5,
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#2e7d32',
    flex: 1 / 2,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: 3, height: 2},
  },
  text: {
    color: '#60ad5e',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textFocus: {
    color: 'white',
    marginTop: 10,
    fontSize: 24,
  },
});

export default Dashboard;
