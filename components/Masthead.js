import React from 'react';
import { View, Text } from 'react-native';

import styles from '../config/styles';

export default class Masthead extends React.Component {
    render() {
        return (
            <View style={styles.mastHead}>
                <Text h1 style={styles.mastHeadText}>{this.props.text}</Text>
            </View>
        );
    }
}