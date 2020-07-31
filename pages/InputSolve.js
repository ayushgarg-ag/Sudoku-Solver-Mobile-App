import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { ToggleButtonGroup } from 'react-bootstrap';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import * as ScreenOrientation from 'expo-screen-orientation';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

// const MenuIcon = ({ navigation }) => <Icon
//     name='three-bars'
//     size={30}
//     color='white'
//     style={{ paddingLeft: 10 }}
// // onPress={navigation.openDrawer()}
// />;

class InputSolve extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        for (let i = 0; i < 81; i++) {
            this.state[i] = '';
        }
        this.focusedItem = null;
        this.history = [''];
        this.historyIndex = 1;
        this.redoArray = [];
    }

    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    };

    async componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    handleFocusedItem = (propertyName, event) => {
        Keyboard.dismiss();
        if (this.focusedItem != null) {
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    borderWidth: 0
                }
            });
        }
        const gridItem = propertyName;
        this.focusedItem = gridItem;
        this['item-' + this.focusedItem].setNativeProps({
            style: {
                borderWidth: 2,
                borderRadius: 2,
                borderColor: '#FFFFFF'
            }
        });
    }

    handleFocusedNumber = (propertyName, event) => {
        Keyboard.dismiss();
        const numberToEnter = propertyName;
        if (this.focusedItem != null) {
            this.setState({ [`${this.focusedItem}`]: numberToEnter });
            this.history[this.historyIndex] = [this.focusedItem, numberToEnter];
            this.historyIndex++;
        }
    }

    handleUndo = () => {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            var lastChange = this.history[this.historyIndex];
            var id = lastChange[0];

            this.redoArray.push(lastChange);

            for (let i = this.historyIndex; i >= 0; i--) {
                if (this.history[i][0] == id) {
                    this.setState({ [`${id}`]: this.history[i][1] });
                }
                else {
                    this.setState({ [`${id}`]: '' });
                }
            }
        }
    }

    handleRedo = () => {
        if (this.redoArray.length > 0) {
            var lastUndo = this.redoArray[this.redoArray.length - 1];
            this.setState({ [`${lastUndo[0]}`]: lastUndo[1] });
            this.redoArray.pop();

            this.history[this.historyIndex] = [lastUndo[0], lastUndo[1]];
            this.historyIndex++;
        }
    }

    handleChange = (propertyName, event) => {
        const gridItem = propertyName;
        const value = event.nativeEvent.text;
        this.setState({ [`${gridItem}`]: value });
    }

    handleClear = () => {
        for (var i = 0; i < 81; i++) {
            this.setState({ [`${i}`]: '' });
            this['item-' + i].setNativeProps({
                style: {
                    color: '#bbe1fa',
                }
            });
        }
        this.history = [''];
        this.historyIndex = 1;
    }

    handleDelete = () => {
        if (this.focusedItem != null) {
            this.setState({ [`${this.focusedItem}`]: '' });
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    color: '#bbe1fa',
                }
            });
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        var grid = []
        for (let i = 0; i < 81; i++) {
            var extraMarginRight = 0;
            var extraMarginBottom = 0;
            if (i % 3 == 2 && i % 9 != 8) {
                extraMarginRight = 5;
            }
            if (i == 18 || i == 45) {
                extraMarginBottom = 5;
            }
            grid.push(<TextInput
                key={i}
                name={(i).toString()}
                value={this.state[i]}
                onChange={this.handleChange.bind(this, (i).toString())}
                placeholder={""}
                style={[componentStyles.input, { marginRight: extraMarginRight, marginBottom: extraMarginBottom }]}
                maxLength={1}
                ref={(thisItem) => this[`item-${i}`] = thisItem}
                onFocus={this.handleFocusedItem.bind(this, (i).toString())}
                showSoftInputOnFocus={false}
                selectTextOnFocus={false}
                selectionColor={'transparent'}
            />);
        }


        var numbers = []
        for (let i = 1; i < 10; i++) {
            i = i.toString();
            numbers.push(
                <TextInput
                    key={'num' + i}
                    name={'num' + i}
                    value={i}
                    style={componentStyles.numberInput}
                    caretHidden={true}
                    onFocus={this.handleFocusedNumber.bind(this, (i).toString())}
                />
            );
        }

        return (

            <View style={containerStyles.container}>

                <View style={containerStyles.headerFiller}>
                </View>

                <View style={containerStyles.gridContainer}>
                    {grid}
                </View>


                <View style={containerStyles.numbersContainer}>
                    {numbers}
                </View>

                <View style={containerStyles.allButtonsContainer}>
                    <View style={componentStyles.delClearButtonsContainer}>
                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleDelete} style={componentStyles.buttonText}>Delete</Text>
                        </View>

                        <View style={componentStyles.mainButtons}>

                            <Text onPress={this.handleClear} style={componentStyles.buttonText}>
                                Clear
                                </Text>

                        </View>
                    </View>

                    <View style={componentStyles.undoRedoButtonsContainer}>
                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleUndo} style={componentStyles.buttonText}>
                                Undo
                                </Text>
                        </View>
                        <View style={componentStyles.mainButtons}>

                            <Text onPress={this.handleRedo} style={componentStyles.buttonText}>
                                Redo
                                </Text>

                        </View>
                    </View>

                    <View style={componentStyles.solveButtonContainer}>
                        <View style={componentStyles.solveButton}>

                            <Text onPress={() =>
                                navigate('Solution', {
                                    JSON_ListView_Clicked_Item: this.state,
                                })
                            } style={componentStyles.buttonText}>Solve</Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

var gridHeight = screenHeight * .56;
var gridWidth = screenWidth;

if (gridWidth < gridHeight) {
    var widthToSet = '100%';
    var itemWidth = '10%';
    var itemHeight = screenWidth * .1;
}
else {
    var widthToSet = gridHeight;
    var itemWidth = widthToSet * .1;
    var itemHeight = widthToSet * .1;
}

const containerStyles = StyleSheet.create({
    container: {
        flex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b262c',
    },
    gridContainer: {
        flex: 60,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: widthToSet,
    },
    numbersContainer: {
        flex: 10,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    allButtonsContainer: {
        flex: 25,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});

const componentStyles = StyleSheet.create({
    input: {
        width: itemWidth,
        height: itemHeight,
        padding: '.4%',
        margin: '.4%',
        textAlign: 'center',
        backgroundColor: '#226897',
        color: '#bbe1fa',
        fontSize: 30,
        borderRadius: 2,
    },
    numberInput: {
        width: itemWidth,
        height: itemHeight,
        color: '#226897',
        backgroundColor: '#bbe1fa',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 2
    },
    delClearButtonsContainer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    undoRedoButtonsContainer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    solveButtonContainer: {
        flex: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainButtons: {
        flex: .5,
        textAlign: 'center',
        backgroundColor: '#305a75',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        padding: '1%'
    },
    
    solveButton: {
        flex: .3,
        textAlign: 'center',
        backgroundColor: '#305a75',
        justifyContent: 'flex-start',
        margin: '3%',
        padding: '2%',
        width: '100%',
        paddingLeft: '8%',
        paddingRight: '8%',
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#BBE1FA',
        width: '100%',
    }
});

export default InputSolve;