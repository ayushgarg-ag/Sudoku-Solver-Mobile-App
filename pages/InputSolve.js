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
        let borderMargin = 2;
        for (let i = 0; i < 9; i++) {
            if (i == 3) {
                borderMargin = 4;
            }
            else if (i == 4) {
                borderMargin = 4;
            }
            // else if (i == 4 || i == 5) {
            //     borderMargin = 3;
            // }
            // else if (i == 7 || i == 8) {
            //     borderMargin = 4;
            // }
            else {
                borderMargin = 2;
            }
            

            
            grid.push(
                <View key={i + "gridContainer"} style={{ flex: 1, flexDirection: 'column', paddingLeft: i * (size + borderMargin) }}>
                    <TextInput
                        key={i}
                        name={(i).toString()}
                        value={this.state[i]}
                        onChange={this.handleChange.bind(this, (i).toString())}
                        placeholder={""}
                        // style={[componentStyles.input, this.focusedItem == (i).toString() ?
                        //     { backgroundColor: '#a1c4db' }
                        //     : { backgroundColor: '#226897' }]}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (i).toString())}
                    />
                    <TextInput
                        key={9 + i}
                        name={(9 + i).toString()}
                        value={this.state[9 + i]}
                        onChange={this.handleChange.bind(this, (9 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (9 + i).toString())}
                    />
                    <TextInput
                        key={18 + i}
                        name={(18 + i).toString()}
                        value={this.state[18 + i]}
                        onChange={this.handleChange.bind(this, (18 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (18 + i).toString())}
                    />
                    <TextInput
                        key={27 + i}
                        name={(27 + i).toString()}
                        value={this.state[27 + i]}
                        onChange={this.handleChange.bind(this, (27 + i).toString())}
                        placeholder={""}
                        style={[componentStyles.input, componentStyles.border]}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (27 + i).toString())}
                    />
                    <TextInput
                        key={36 + i}
                        name={(36 + i).toString()}
                        value={this.state[36 + i]}
                        onChange={this.handleChange.bind(this, (36 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (36 + i).toString())}
                    />
                    <TextInput
                        key={45 + i}
                        name={(45 + i).toString()}
                        value={this.state[45 + i]}
                        onChange={this.handleChange.bind(this, (45 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (45 + i).toString())}
                    />
                    <TextInput
                        key={54 + i}
                        name={(54 + i).toString()}
                        value={this.state[54 + i]}
                        onChange={this.handleChange.bind(this, (54 + i).toString())}
                        placeholder={""}
                        style={[componentStyles.input, componentStyles.border]}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (54 + i).toString())}
                    />
                    <TextInput
                        key={63 + i}
                        name={(63 + i).toString()}
                        value={this.state[63 + i]}
                        onChange={this.handleChange.bind(this, (63 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (63 + i).toString())}
                    />
                    <TextInput
                        key={72 + i}
                        name={(72 + i).toString()}
                        value={this.state[72 + i]}
                        onChange={this.handleChange.bind(this, (72 + i).toString())}
                        placeholder={""}
                        style={componentStyles.input}
                        maxLength={1}
                        onFocus={this.handleFocusedItem.bind(this, (72 + i).toString())}
                    />
                </View>
            );
        }

        var numbers = []
        for (let i = 1; i < 10; i++) {
            i = i.toString();
            numbers.push(
                <View key={i + "numbersContainer"} style={{ flex: 1, flexDirection: 'row', paddingLeft: (i - 1) * (size + 5) }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigate('Solution', {
                                JSON_ListView_Clicked_Item: this.state,
                            })
                        }
                    >
                        <TextInput
                            key={'num' + i}
                            name={'num' + i}
                            value={i}
                            // onChange={this.handleChange.bind(this, (i).toString())}
                            style={componentStyles.numberInput}
                            caretHidden={true}
                            onFocus={this.handleFocusedNumber.bind(this, (i).toString())}
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        return (

            <View style={containerStyles.container}>
                <View style={containerStyles.columnContainer}>

                    <View style={componentStyles.grid}>
                        {grid}
                    </View>


                    <View style={componentStyles.numbers}>
                        {numbers}
                    </View>

                    <View style={containerStyles.buttonContainer}>


                        <View style={componentStyles.button}>
                            <TouchableOpacity>
                                <Text style={componentStyles.solveText}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={componentStyles.button}>
                            <TouchableOpacity>
                                <Text style={componentStyles.solveText}>Restart</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={componentStyles.button}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Solution', {
                                        JSON_ListView_Clicked_Item: this.state,
                                    })
                                }
                            >
                                <Text style={componentStyles.solveText}>Solve</Text>
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
        padding: 8,
        paddingTop: 125,
        justifyContent: 'center',
        backgroundColor: '#1b262c'
    },
    columnContainer: {
        flexDirection: 'column',
        height: 800
    },
    buttonContainer: {
        top: 500,
    }
});

const componentStyles = StyleSheet.create({
    numbers: {
        top: 440,
        alignContent: 'center',
    },
    numberInput: {
        width: size,
        height: size,
        marginBottom: 8,
        backgroundColor: '#a1c4db',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 5
    },
    grid: {
        alignContent: 'center',
    },
    input: {
        width: size,
        height: size,
        // padding: 10,
        marginBottom: 2,
        backgroundColor: '#226897',
        color: '#bbe1fa',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 0,
    },
    border: {
        marginTop: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#305a75",
        padding: 6
    },
    solveText: {
        fontSize: 30
    }
});

export default InputSolve;

