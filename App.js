import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, StatusBar, Platform, TouchableHighlight, Button } from 'react-native';

// import { } from './util';

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
export default class CharactersList extends React.Component {
  constructor() {
    super();
    this.state = {
        characters: [],
        listSize: 20
    };

    // binding
    this.newRandomCharactersList = this.newRandomCharactersList.bind(this);
    this.incrementListSize = this.incrementListSize.bind(this);
  }

  componentDidMount() {
    console.log('Running API');
    this.newRandomCharactersList();
  }

  newRandomCharactersList() {
    api.getRandomMarvelCharacters(this.state.listSize, (err, characters) => {
        if (err) {
            return console.error(err);
        } else {
            this.setState({
                characters
            });
        }
    });
  }

  incrementListSize(amount) {
    // let listSize = this.listSize;
    // console.log('LS:', listSize);
    let MAX_LIST_SIZE = 20;
    if (this.state.listSize === MAX_LIST_SIZE && amount >= 0) {
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
            <Button title="Refresh" color='white' onPress={this.newRandomCharactersList}/>
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
        { characterListItems(this.state.characters) }
      </ScrollView>
    );
  }
}


export class FullScreenImage extends React.Component {

    onPress() {
        console.log('Full Screen Image pressed!');
    }

    render() {
        <TouchableHighlight onPress={this.onPress}>
            <Image style={styles.fullScreenImage} source={{ uri: this.props.uri }} />
        </TouchableHighlight>
    }
}


export class CharacterListItem extends React.Component {
    render() {
        let th = this.props.character.thumbnail;
        let imagePath = th.path + '.' + th.extension;

        let numComics = Object.keys(this.props.character.comics.items).length;
        numComics = numComics === 20 ? '20+' : new String(numComics)
        return (
            <View 
                style={styles.characterListItem}
            >
                <TouchableHighlight>
                    <Image style={{ height: 60, width: 60 }} source={{ uri: imagePath }} />
                </TouchableHighlight>
                <Text h2 style={styles.textSubHeader}>{this.props.character.name}</Text>
                <Text style={styles.textMain}># of comics: {numComics}</Text>
            </View>
        );
    }
}


// FUNCTIONS: util

function characterListItems(characters) {
    return characters.map((character, key) => {
        return (
            <CharacterListItem key={key} character={character} />
        )
    });
}
