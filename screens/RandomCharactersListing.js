import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, TouchableOpacity, Button } from 'react-native';

// Components
import HeaderSection from '../components/HeaderSection';
import CharacterList from '../components/CharacterList';

//lib
import { undef } from '../lib/util';
import api from '../lib/api';

// config
import styles from '../config/styles';


// Main
console.log('Plat:', Platform)


const newStyles = StyleSheet.create({
    buttonViewStyle: {
        backgroundColor: styles.color.secondary,

    }
}); 

// MARVEL CHARACTERS
export default class RandomCharactersListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        characters: [],
        listSize: 20
    };

    // binding
    this.newCharactersList = this.newCharactersList.bind(this);
    this.incrementListSize = this.incrementListSize.bind(this);
  }

  componentDidMount() {
    console.log('Running API');
    this.newCharactersList();
  }

  newCharactersList(options) {
    if (typeof(options) === 'undefined') {
        options = {}
    }

    let { rand, id } = options;
    if (undef(rand)) {
        rand = true;
    }

    if (!undef(id)) {
        api.getMarvelCharacter(id, (err, character) => {
            if (err) {
                return console.error(err);
            } else {
                this.setState({
                    characters: [character]
                });
            }
        });
    } else {
        api.getMarvelCharacters(this.state.listSize, { rand }, (err, characters) => {
            if (err) {
                return console.error(err);
            } else {
                this.setState({
                    characters
                });
            }
        });
    }

    
  }

  incrementListSize(amount) {
    let MAX_LIST_SIZE = 20;
    if (this.state.listSize === MAX_LIST_SIZE && amount >= 0 
        || this.state.listSize === 0 && amount <= 0) {
        return;
    }

    let newSize = this.state.listSize + amount;
    if (newSize > 20) {
        newSize = 20;
    }
    this.setState({
        listSize: newSize
    });
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <HeaderSection text="Marvel Heroes (Rand)"/>
        <View style={styles.bodySection}>
            <View style={{backgroundColor: styles.color.tertiary, flex: 0.2, flexDirection: 'column' }}>
                {/* Refresh */}
                <View style={newStyles.buttonViewStyle}>
                    <Button title="Refresh" color="white" onPress={this.newCharactersList} />
                </View>
                {/* Counter */}
                <View style={newStyles.buttonViewStyle}>
                    <Text style={{ color: 'black', backgroundColor: 'yellow', textAlign: 'center'}} h2 >{this.state.listSize}</Text>
                </View>
                {/* Plus */}
                <View style={newStyles.buttonViewStyle}>
                    <Button title="+" color='white' onPress={() => { this.incrementListSize(1); }} />
                </View>
                {/* Minus */}
                <View style={newStyles.buttonViewStyle}>
                    <Button title="-" color='white' onPress={() => { this.incrementListSize(-1); }} />
                </View>
            </View>
            <View style={{ flex: 0.8, flexDirection: 'column'}}>
                <ScrollView>
                    <CharacterList characters={this.state.characters} />
                </ScrollView>
            </View>
        </View>
      </View>
    );
  }
}