// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';

// export default function App() {
//   const [value, onChangeText] = React.useState('Useless Placeholder');

//   return (
//     <View style={styles.container}>
//       <Text>Welcome to our Sudoku Mobile App!</Text>
//       <StatusBar style="auto" />
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//         onChangeText={text => onChangeText(text)}
//         value={value}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

//This is an example code to pass values between two screens using React Navigator// 
import React, { Component } from 'react';

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InputSolve from './pages/InputSolve';
import Solution from './pages/Solution';

//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  InputSolve: { screen: InputSolve },
  //First entry by default be our first screen 
  //if we do not define initialRouteName
  Solution: { screen: Solution },
},
  {
    initialRouteName: 'InputSolve',
  }
);
export default createAppContainer(App);
