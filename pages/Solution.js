import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Sudoku from '../Sudoku';
import InputSolve from './InputSolve';

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
                let num = this.props.navigation.state.params["JSON_ListView_Clicked_Item"][i*9 + j];

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


        let inputGrid = [];
        const size = 40;
        for (let i = 0; i < 9; i++) {
            inputGrid.push(
                <View key={i + " container"} style={{ flex: 1, flexDirection: 'column', paddingLeft: i * (size + 5) }}>
                    <Text key={i} style={styles.TextStyle}>
                        {solvedSudoku[0][i]}
                    </Text>
                    <Text key={9 + i} style={styles.TextStyle}>
                        {solvedSudoku[1][i]}
                    </Text>
                    <Text key={18 + i} style={styles.TextStyle}>
                        {solvedSudoku[2][i]}
                    </Text>
                    <Text key={27 + i} style={styles.TextStyle}>
                        {solvedSudoku[3][i]}
                    </Text>
                    <Text key={36 + i} style={styles.TextStyle}>
                        {solvedSudoku[4][i]}
                    </Text>
                    <Text key={45 + i} style={styles.TextStyle}>
                        {solvedSudoku[5][i]}
                    </Text>
                    <Text key={54 + i} style={styles.TextStyle}>
                        {solvedSudoku[6][i]}
                    </Text>
                    <Text key={63 + i} style={styles.TextStyle}>
                        {solvedSudoku[7][i]}
                    </Text>
                    <Text key={72 + i} style={styles.TextStyle}>
                        {solvedSudoku[8][i]}
                    </Text>
                </View>
            );
        }

        return (
            <View style={{ padding: 5, paddingTop: 100 }}>
            {inputGrid}
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
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