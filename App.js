import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, StatusBar, Platform, TouchableOpacity, Button } from 'react-native';

 import { undef } from './util';

import styles from './styles';
import api from './api';


// Main
console.log('Plat:', Platform)


// CLASSES

export class DefaultStatusBar extends React.Component {
    render() {
        return (
            <View style={styles.statusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
        )
    }
}


export class MastHead extends React.Component {
    render() {
        return (
            <View style={styles.mastHead}>
                <Text h1 style={styles.mastHeadText}>{this.props.text}</Text>
            </View>
        );
    }
}


// MARVEL CHARACTERS
export default class CharactersListingView extends React.Component {
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
    if (this.state.listSize === MAX_LIST_SIZE && amount >= 0) {
        return;
    } else if (this.state.listSize == 0 && amount <= 0) {
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
        <MastHead text="Marvel Heroes"/>
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
        {characterListItems(this.state.characters)}
      </ScrollView>
    );
  }
}


/*export class CharacterListItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: props.characters
        };
    }

    render() {
        return (
            {this.state.characters.map((character, key) => {
                return (
                    <CharacterListItem key={key} character={character} />
                )
            });}
        )
    }
}*/

function characterListItems(characters) {
    return characters.map((character, key) => {
        return (
            <CharacterListItem key={key} character={character} />
        )
    });
}


export class CharacterListItem extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.openCharacter = this.openCharacter.bind(this);
    }

    /*openCharacter() {

    }*/

    render() {
        let th = this.props.character.thumbnail;
        let imagePath = th.path + '.' + th.extension;

        let numComics = Object.keys(this.props.character.comics.items).length;
        numComics = numComics === 20 ? '20+' : new String(numComics)
        return (
            <TouchableOpacity 
                style={styles.characterListItem}
                onPress={this.openCharacter}
            >
                {/*<TouchableHighlight>*/}
                    <Image style={{ height: 60, width: 60 }} source={{ uri: imagePath }} />
                {/*</TouchableHighlight>*/}
                <Text h2 style={styles.textSubHeader}>{this.props.character.name}</Text>
                <Text style={styles.textMain}># of comics: {numComics}</Text>
            </TouchableOpacity>
        );
    }
}


// FUNCTIONS: util
