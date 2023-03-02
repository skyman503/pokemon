/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './src/components/TabBar';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

export default App;
