import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, StatusBar, Platform, TouchableHighlight } from 'react-native';

import { } from './util';

import styles from './styles';
import api from './api';


// Main
console.log('Plat:', Platform)


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
        characters: []
    }
  }

  componentDidMount() {
    console.log('Running API');
    api.processCharacters((err, characters) => {
        if (err) {
            return console.error(err);
        } else {
            this.setState({
                characters
            });
        }
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
      >
        {/*<View style={styles.header}>
            <Header>HEADER</Header>
        </View>*/}
        <DefaultStatusBar/>
        <MastHead text="Marvel Heroes"/>
        { characterViews(this.state.characters) }
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

function characterViews(characters) {
    return characters.map((character, k) => {
        let th = character.thumbnail;
        let imagePath = th.path + '.' + th.extension;

        let numComics = Object.keys(character.comics.items).length;
        numComics = numComics === 20 ? '20+' : new String(numComics)
        //console.log('imagePath:', imagePath);
        return (
            // name, thumbnail, Object.keys(comics.items).length
            <View 
                style={styles.characterListItem}
                key={k}
            >
                <TouchableHighlight>
                    <Image style={{ height: 60, width: 60 }} source={{ uri: imagePath }} />
                </TouchableHighlight>
                <Text h2>{character.name}</Text>
                <Text># of comics: {numComics}</Text>
            </View>
        )
    });
}