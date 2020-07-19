import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import Instructions from '../pages/Instructions';
import Header from '../header';

//import all the screens we are going to switch 
const InstructionsStack = createStackNavigator({

  //Constant which holds all the screens like index of any book 
  Instructions: {
    screen: Instructions,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Instructions' navigation={navigation} />
      }
    },
  },

});
export default InstructionsStack;