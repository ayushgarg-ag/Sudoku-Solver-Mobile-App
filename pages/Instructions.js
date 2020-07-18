import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';


const size = 18;

class Instructions extends Component {
    
    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    }; 

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.header}>Features</Text>
                <Unorderedlist color='white' style={{fontSize: size, marginLeft: 30, marginTop: 10}}>
                    <Text style={styles.text}>
                        Input any Sudoku to solve (including an empty grid)
                    </Text>
                </Unorderedlist>
                <Unorderedlist color='white' style={{fontSize: size, marginLeft: 30, marginTop: 10}}>
                    <Text style={styles.text}>
                        Inputting an invalid sudoku will raise a warning
                    </Text>
                </Unorderedlist>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: '#1b262c',
    },
    text: {
        color: 'white',
        fontSize: size,
        margin: 10,
    },
    header: {
        color: 'white',
        fontSize: 25,
        margin: 10,
        textDecorationLine: 'underline',
    },
});

export default Instructions;