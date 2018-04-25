import React from 'react';

import RandomCharactersListing from './screens/RandomCharactersListing';
import CharacterSearchListing from './screens/CharacterSearchListing';


export default class App extends React.Component {

    render() {
        return (
            <CharacterSearchListing/>
        );
    }
}