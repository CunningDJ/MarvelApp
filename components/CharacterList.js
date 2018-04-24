import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

import styles from '../config/styles';

export default class CharacterList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //let characters = this.props.characters;
        return this.props.characters.map((character, key) => {
            return (
                <CharacterListItem key={key} character={character} />
            )
        })
    }
}


class CharacterListItem extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.openCharacter = this.openCharacter.bind(this);
    }

    openCharacter() {
        return;
    }

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

/*function characterListItems(characters) {
    return characters.map((character, key) => {
        return (
            <CharacterListItem key={key} character={character} />
        )
    });
}*/