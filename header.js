import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Math.round(Dimensions.get('window').width);

function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#226897',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    left: 10,
    color: 'white',
  }
});

export default Header;