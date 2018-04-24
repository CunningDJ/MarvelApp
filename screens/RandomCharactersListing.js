import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Platform, TouchableOpacity, Button } from 'react-native';

// Components
import DefaultStatusBar from '../components/DefaultStatusBar';
import Masthead from '../components/Masthead';
import CharacterList from '../components/CharacterList';

//lib
import { undef } from '../lib/util';
import api from '../lib/api';

// config
import styles from '../config/styles';


// Main
console.log('Plat:', Platform)


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
    // let listSize = this.listSize;
    // console.log('LS:', listSize);
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
      <ScrollView
        style={styles.container}
      >
        <DefaultStatusBar/>
        <Masthead text="Marvel Heroes"/>
        <View style={{backgroundColor: styles.color.tertiary}}>
            {/* Refresh */}
            <Button title="Refresh" color='white' onPress={this.newCharactersList}/>
            {/* Counter */}
            <Text h2 style={{ color: 'black', backgroundColor: 'yellow', flex: 0.2, textAlign: 'center' }}>{this.state.listSize}</Text>
            {/* Plus */}
            <Button title="+" color='white' onPress={() => 
                { this.incrementListSize(1); }
            }
            />
            {/* Minus */}
            <Button title="-" color='white' onPress={() => { this.incrementListSize(-1); }}/>
        </View>
        {/*<CharacterListItems characters={this.state.characters} />*/}
        {/*characterListItems(this.state.characters)*/}
        <CharacterList characters={this.state.characters}/>
      </ScrollView>
    );
  }
}