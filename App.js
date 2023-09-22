import React from 'react'
import {Rootstack} from './navigations';

import { View, StyleSheet } from 'react-native';


function App() {
  return (
    <View style={styles.body}>
      <Rootstack />
    </View>
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;