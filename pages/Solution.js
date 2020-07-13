import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Sudoku from '../Sudoku';
import InputSolve from './InputSolve';

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


class Solution extends Component {
    static navigationOptions = {
        title: 'Sudoku Solver',
    };

    render() {
        const { navigate } = this.props.navigation;
        let matrix = [];
        for (let i = 0; i < 9; i++) {
            let matrixRow = [];
            for (let j = 0; j < 9; j++) {
                let num = this.props.navigation.state.params["JSON_ListView_Clicked_Item"][i * 9 + j];

                if (num == "") {
                    matrixRow.push(0);
                }
                else {
                    matrixRow.push(parseInt(num));
                }

            }
            matrix.push(matrixRow);
        }

        const inputtedSudoku = new Sudoku(matrix);
        inputtedSudoku.solve();
        var solvedSudoku = inputtedSudoku.returnArray();

        var solvedGrid = []
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                var extraMarginRight = 0;
                var extraMarginBottom = 0;
                var loc = i * 9 + j;
                if (loc % 3 == 2 && loc % 9 != 8) {
                    extraMarginRight = 5;
                }
                if (loc == 18 || loc == 45) {
                    extraMarginBottom = 5;
                }

                solvedGrid.push(<Text key={i * 9 + j} style={[styles.input, { marginRight: extraMarginRight, marginBottom: extraMarginBottom }]}>
                    {solvedSudoku[i][j]}
                </Text>);
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {solvedGrid}
                </View>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         // margin: 50,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     TextStyle: {
//         fontSize: 23,
//         textAlign: 'center',
//         color: '#f00',
//     },
// });
const styles = StyleSheet.create({
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
    TextStyle: {
        width: 40,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#DBDBD6',
    },
});

export default Solution;