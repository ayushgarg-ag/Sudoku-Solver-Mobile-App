import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import About from '../pages/About';
import Header from '../header';

//import all the screens we are going to switch 
const AboutStack = createStackNavigator({
  
  //Constant which holds all the screens like index of any book 
  About: { 
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='About' navigation={navigation} />
      }
    },
  },
  
}
);
export default AboutStack;
