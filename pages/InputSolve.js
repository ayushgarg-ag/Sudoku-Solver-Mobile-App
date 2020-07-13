import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import { ToggleButtonGroup } from 'react-bootstrap';
import { withNavigation } from 'react-navigation';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
var size;
if (screenWidth > screenHeight) {
    size = screenHeight / 10;
}
else {
    size = screenWidth / 10;
}

var delay = ms => new Promise(res => setTimeout(res, ms));

var gridWidth = screenWidth / 10;

class InputSolve extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        for (let i = 0; i < 81; i++) {
            this.state[i] = '';
        }
        this.focusedItem = null;
        this.history = [];
        this.historyIndex = 0;
        this.redoArray = [];
    }

    handleFocusedItem = (propertyName, event) => {
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
        const numberToEnter = propertyName;
        if (this.focusedItem != null) {
            this.setState({ [`${this.focusedItem}`]: numberToEnter });
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    color: '#226897',
                    backgroundColor: '#bbe1fa'
                }
            });
            // this.history.push([this.focusedItem, numberToEnter]);
            this.history[this.historyIndex] = [this.focusedItem, numberToEnter];
            this.historyIndex++;
        }
    }

    handleUndo = () => {
        if (this.historyIndex != 0) {
            this.historyIndex--;
            var lastChange = this.history[this.historyIndex];
            var id = lastChange[0];

            this.redoArray.push(lastChange);

            for (let i = this.historyIndex - 1; i >= 0; i--) {
                if (this.history[i][0] == id) {
                    this.setState({ [`${id}`]: this.history[i][1] });
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

    handleRestart = () => {
        for (var i = 0; i < 81; i++) {
            this.setState({ [`${i}`]: '' });
            this['item-' + i].setNativeProps({
                style: {
                    backgroundColor: '#226897',
                    color: '#bbe1fa',
                }
            });
        }
        this.history = [];
        this.historyIndex = 0;
    }

    handleDelete = () => {
        if (this.focusedItem != null) {
            this.setState({ [`${this.focusedItem}`]: '' });
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    backgroundColor: '#226897',
                    color: '#bbe1fa',
                }
            });
        }
    }

    navigationOptions = {
        title: 'Sudoku Solver Input',
    };

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
                // <TouchableOpacity
                //     onPress={() =>
                //         navigate('Solution', {
                //             JSON_ListView_Clicked_Item: this.state,
                //         })
                //     }
                //     key={i + 'touch'}
                //     style={componentStyles.numberInput}
                // >
                <TextInput
                    key={'num' + i}
                    name={'num' + i}
                    value={i}
                    // onChange={this.handleChange.bind(this, (i).toString())}
                    style={componentStyles.numberInput}
                    caretHidden={true}
                    onFocus={this.handleFocusedNumber.bind(this, (i).toString())}
                />
                // </TouchableOpacity>
            );
        }

        return (

            <View style={containerStyles.container}>

                <View style={containerStyles.gridContainer}>
                    {grid}
                </View>


                <View style={containerStyles.numbersContainer}>
                    {numbers}
                </View>

                <View style={containerStyles.allButtonsContainer}>
                    <View style={componentStyles.delRestartButtonsContainer}>
                        <View style={componentStyles.mainButtons}>
                                <Text onPress={this.handleDelete} style={componentStyles.buttonText}>Delete</Text>
                        </View>

                        <View style={componentStyles.mainButtons}>

                                <Text onPress={this.handleRestart} style={componentStyles.buttonText}>
                                    Restart
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
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Solution', {
                                        JSON_ListView_Clicked_Item: this.state,
                                    })
                                }
                            >

                                <Text style={componentStyles.buttonText}>Solve</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const containerStyles = StyleSheet.create({
    container: {
        flex: 100,
        justifyContent: 'center',
        backgroundColor: '#1b262c'
    },
    gridContainer: {
        flex: 55,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    numbersContainer: {
        flex: 10,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignContent: 'center',
    },
    allButtonsContainer: {
        flex: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

const componentStyles = StyleSheet.create({
    input: {
        width: '10%',
        height: gridWidth,
        padding: '.4%',
        margin: '.4%',
        textAlign: 'center',
        backgroundColor: '#226897',
        color: '#bbe1fa',
        fontSize: 30,
        borderRadius: 2,
    },
    numberInput: {
        width: '10%',
        height: gridWidth,
        // backgroundColor: '#a1c4db',
        color: '#226897',
        backgroundColor: '#bbe1fa',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 2
    },
    delRestartButtonsContainer: {
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
    solveButtonContainer: {
        height: '30%',
        flex: 19,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    solveButton: {
        marginTop: '3%',
        padding: '3%',
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: '#305a75',
        justifyContent: 'flex-start'
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#BBE1FA'
    }
});

export default InputSolve;

