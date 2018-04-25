'use strict';

import React from 'react';
import { View, TextInput, ScrollView } from 'react-native';

import HeaderSection from '../components/HeaderSection';
import CharacterList from '../components/CharacterList';

import styles from '../config/styles';
import api from '../lib/api';

const MAX_CHARACTERS = 99;

export default class CharacterSearchListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            //searchText: ''
        };

        this._searchText = '';

        this.searchCharacters = this.searchCharacters.bind(this);
    }

    searchCharacters(searchText) {
        this._searchText = searchText;

        if (searchText === '') {
            return this.setState({
                characters: []
            });
        }

        setTimeout(() => {
            // After timeout, checks if the most recent search text is still the given, and ignore this search if not
            if (searchText !== this._searchText) {
                return;
            }
            api.getMarvelCharacters(MAX_CHARACTERS, { nameStartsWith: searchText }, (err, characters) => {
                if (searchText !== this._searchText) {
                    return;
                }
                if (err) {
                    return console.error(err);
                }
                this.setState({
                    characters
                });
            });
        }, 5);
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderSection text="Character Search"/>
                <View style={styles.bodySection}>
                    <TextInput placeholder="Character name" onChangeText={this.searchCharacters} style={styles.searchBar} />
                    <ScrollView>
                        <CharacterList characters={this.state.characters} />
                    </ScrollView>
                </View>
            </View>

        );
    }
}