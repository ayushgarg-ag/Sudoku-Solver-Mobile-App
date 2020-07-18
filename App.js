import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import SudokuStack from './stacks/SudokuStack';
import InstructionsStack from './stacks/InstructionsStack';
import AboutStack from './stacks/AboutStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Sudoku: {
    screen: SudokuStack,
  },
  Instructions: {
    screen: InstructionsStack,
  },
  About: {
    screen: AboutStack,
  },
});

export default createAppContainer(RootDrawerNavigator);