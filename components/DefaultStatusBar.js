import React from 'react';
import { View, StatusBar } from 'react-native';

import styles from '../config/styles';

export default class DefaultStatusBar extends React.Component {
    render() {
        return (
            <View style={styles.statusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
        )
    }
}