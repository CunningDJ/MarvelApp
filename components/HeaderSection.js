import React from 'react';
import { View } from 'react-native';

import DefaultStatusBar from './DefaultStatusBar';
import Masthead from './Masthead';

import styles from '../config/styles';


export default class HeaderSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.headerSection }>
                <DefaultStatusBar/>
                <Masthead text={this.props.text}/>
            </View>
        );
    }
}