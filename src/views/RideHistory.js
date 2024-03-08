import React from 'react';
import { Button, Text, View,StyleSheet } from 'react-native';

function History({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Go to Dashboard"
        onPress={() => navigation.navigate('dashboard')}
      />
      <Text>i'm history</Text>
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });