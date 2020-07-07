import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';

class InputSolve extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        for (let i = 0; i < 81; i++) {
            this.state[i] = '';
        }
    }

    handleChange = (propertyName, event) => {
        const gridItem = propertyName;
        const value = event.nativeEvent.text;
        this.setState({ [`${gridItem}`]: value });
    }

    navigationOptions = {
        title: 'Input Solve',
    };

    render() {
        const { navigate } = this.props.navigation;

        let grid = []
        const size = 40
        for (let i = 0; i < 9; i++) {
            grid.push(
                <View key={i + " container"} style={{ flex: 1, flexDirection: 'column', paddingLeft: i * (size + 5) }}>
                    <TextInput
                        key={i}
                        name={(i).toString()}
                        value={this.state[i]} 
                        onChange={this.handleChange.bind(this, (i).toString())} 
                        placeholder={""}
                        style={styles.input}
                    />
                    <TextInput
                        key={9 + i}
                        name={(9 + i).toString()}
                        value={this.state[9 + i]} 
                        onChange={this.handleChange.bind(this, (9 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={18 + i}
                        name={(18 + i).toString()}
                        value={this.state[18 + i]} 
                        onChange={this.handleChange.bind(this, (18 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={27 + i}
                        name={(27 + i).toString()}
                        value={this.state[27 + i]} 
                        onChange={this.handleChange.bind(this, (27 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={36 + i}
                        name={(36 + i).toString()}
                        value={this.state[36 + i]} 
                        onChange={this.handleChange.bind(this, (36 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={45 + i}
                        name={(45 + i).toString()}
                        value={this.state[45 + i]} 
                        onChange={this.handleChange.bind(this, (45 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={54 + i}
                        name={(54 + i).toString()}
                        value={this.state[54 + i]} 
                        onChange={this.handleChange.bind(this, (54 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={63 + i}
                        name={(63 + i).toString()}
                        value={this.state[63 + i]} 
                        onChange={this.handleChange.bind(this, (63 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                    <TextInput
                        key={72 + i}
                        name={(72 + i).toString()}
                        value={this.state[72 + i]} 
                        onChange={this.handleChange.bind(this, (72 + i).toString())} 
                        placeholder={""} 
                        style={styles.input}
                    />
                </View>
            );
        }

        return (

            <View style={{ padding: 5, paddingTop: 100 }}>
                <Button
                    title="Go Next"
                    onPress={() =>
                        navigate('Solution', {
                            JSON_ListView_Clicked_Item: this.state,
                        })
                    }
                />
                
                {grid}
                
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

export default InputSolve;

