import React from 'react';
import { Button, Text, View,StyleSheet } from 'react-native';

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="pickup"
        onPress={() => navigation.navigate('pickup')}
      />
      <Text>i'm history</Text>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });