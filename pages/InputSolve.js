import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { Input } from 'react-native-elements';

export default class InputSolve extends Component {

    state = {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
    }
    navigationOptions = {
        title: 'Input Solve',
    };

    handleChange = (propertyName, event) => {
        const gridItem = propertyName
        const value = event.nativeEvent.text
        this.setState({ [`${gridItem}`]: value });
    }

    render() {
        const { navigate } = this.props.navigation;
        let grid = [];
        for (var i = 0; i < 9; i++) {
            const key = i;
            grid.push(<TextInput
                key={i}
                name={i.toString()}
                value={this.state[i]}
                onChange={this.handleChange.bind(this, i.toString())}
                placeholder={""}
                style={styles.input}
            />)
            
        }

        return (
            <View style={styles.container}>
                {/*Input to get the value from the user*/}
                {grid}

                {/*Button to go to the next activity*/}
                <Button
                    title="Go Next"
                    onPress={() =>
                        navigate('Solution', {
                            JSON_ListView_Clicked_Item: this.state,
                        })
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: 40,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#DBDBD6',
    },
});