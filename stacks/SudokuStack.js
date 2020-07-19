import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import InputSolve from '../pages/InputSolve';
import Solution from '../pages/Solution';
import Header from '../header';

const MenuIcon = ({ navigation }) => <Icon
  name='three-bars'
  size={30}
  color='white'
  style={{ paddingLeft: 10 }}
// onPress={navigation.openDrawer()}
/>;

//import all the screens we are going to switch 
const SudokuStack = createStackNavigator({

  //Constant which holds all the screens like index of any book 
  InputSolve: {
    screen: InputSolve,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Sudoku Solver Input' navigation={navigation} />
      }
    },
  },

  // First entry by default to be our first screen 
  // if we do not define initialRouteName
  Solution: { screen: Solution },
},
  {
    initialRouteName: 'InputSolve',
  }
);
export default SudokuStack;
