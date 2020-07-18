import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';


class About extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    }; 

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Hello! This website was co-created and designed from scratch by Ayush Garg and Suchit Sharma in the summer of 2020.
                </Text>
                <Text style={styles.text}>
                As Sudoku fanatics ourselves, we sought to create a website that combines all of our favorite features when completing challenging Sudokus. We tried to incorporate functionality that promotes ease of movement throughout the Sudoku, options to increase speed while solving, and aesthetic characteristics to promote visual appeal.
                </Text>
                
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
        fontSize: 15,
        margin: 10,
        textAlign: 'center',
    },
    header: {
        color: 'white',
        fontSize: 30,
        margin: 10,
        textDecorationLine: 'underline',
    },
});

export default About;