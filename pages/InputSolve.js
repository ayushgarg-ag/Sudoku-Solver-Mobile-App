import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import { ToggleButtonGroup } from 'react-bootstrap';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
var size;
if (screenWidth > screenHeight) {
    size = screenHeight / 10;
}
else {
    size = screenWidth / 10;
}

var gridWidth = screenWidth / 10;

class InputSolve extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        for (let i = 0; i < 81; i++) {
            this.state[i] = '';
        }
        this.focusedItem = 0;
    }

    handleFocusedItem = (propertyName, event) => {
        const gridItem = propertyName;
        this.focusedItem = gridItem;
    }

    handleFocusedNumber = (propertyName, event) => {
        const numberToEnter = propertyName;
        this.setState({ [`${this.focusedItem}`]: numberToEnter });
    }

    handleChange = (propertyName, event) => {
        const gridItem = propertyName;
        const value = event.nativeEvent.text;
        this.setState({ [`${gridItem}`]: value });
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
                onFocus={this.handleFocusedItem.bind(this, (i).toString())}
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
                    <View style={componentStyles.undoButtonsContainer}>
                        <View style={componentStyles.undoButtons}>
                            <TouchableOpacity>
                                <Text style={componentStyles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={componentStyles.undoButtons}>
                            <TouchableOpacity>
                                <Text style={componentStyles.buttonText}>Restart</Text>
                            </TouchableOpacity>
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
        flex: 60,
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
        backgroundColor: 'lightgrey',
        padding: '.4%',
        margin: '.4%',
        textAlign: 'center',
        backgroundColor: '#226897',
        color: '#bbe1fa',
        fontSize: 30,
        borderRadius: 2
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
    undoButtonsContainer: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    undoButtons: {
        flex: .5,
        textAlign: 'center',
        margin: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        padding: '1%',
        backgroundColor: '#305a75'
    },
    solveButtonContainer: {
        flex: 20,
        alignItems: 'center',
    },
    solveButton: {
        width: '90%',
        padding: '1%',
        backgroundColor: '#305a75'
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center'
    }
});

export default InputSolve;

