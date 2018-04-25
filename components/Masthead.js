import React from 'react';
import { View, Text } from 'react-native';

import styles from '../config/styles';

export default class Masthead extends React.Component {
    render() {
        return (
            <View style={styles.masthead}>
                <Text h1 style={styles.mastheadText}>{this.props.text}</Text>
            </View>
        );
    }
}