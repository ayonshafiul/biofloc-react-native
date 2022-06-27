/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./src/screens/Login.js";
import Dashboard from './src/screens/Dashboard.js';
import Temperature from './src/screens/Temperature.js';
import Turbidity from './src/screens/Turbidity.js';
import Distance from './src/screens/Distance.js';
import TDS from './src/screens/TDS.js';
import PH from './src/screens/PH.js';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "Biofloc Automation"
        }}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{title: 'Dashboard'}}
        />
        <Stack.Screen
          name="temperature"
          component={Temperature}
          options={{title: 'Temperature'}}
        />
        <Stack.Screen
          name="turbidity"
          component={Turbidity}
          options={{title: 'Turbidity'}}
        />
        <Stack.Screen
          name="distance"
          component={Distance}
          options={{title: 'Distance'}}
        />
        <Stack.Screen
          name="tds"
          component={TDS}
          options={{title: 'TDS'}}
        />
        <Stack.Screen
          name="ph"
          component={PH}
          options={{title: 'pH'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
