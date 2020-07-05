import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Solution extends Component {
    static navigationOptions = {
        title: 'Solution',
    };

    getStyle = () => {
        return {
            // backgroundColor: this.props.navigation.state.params.JSON_ListView_Clicked_Item
        }
    } 

    render() {
        const { navigate } = this.props.navigation;
        let inputGrid = [];
        for (let i = 0; i < 9; i++) {
            i = i.toString();
            inputGrid.push(<Text key={i + '9'} style={styles.TextStyle}>
                {this.props.navigation.state.params["JSON_ListView_Clicked_Item"][i]}
            </Text>)
        }

        return (
            <View
            style={styles.container}
            // style={this.getStyle()}
            >
            {inputGrid}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },
});