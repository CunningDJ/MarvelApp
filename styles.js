import { Platform } from 'react-native';
import { isIOS } from './util';

const STATUS_BAR_HEIGHT = 20;

var styles = {
    "container": {
        "flex": 0.7,
        "flexDirection": "column"
    },
    "header": {
        "height": 75,
        "backgroundColor": "black"
    },
    "statusBar": {
        "height": Platform.select({
            ios: STATUS_BAR_HEIGHT,
            android: 0
        }),
        "backgroundColor": "dodgerblue"
        
    },
    "movieListItem": {
        "height": 100,
        "backgroundColor": "cornsilk",
        "borderColor": "midnightblue",
        "borderBottomWidth": 1
    },
    "characterListItem": {
        "height": 100,
        "backgroundColor": "dodgerblue",
        "borderColor": "midnightblue",
        "borderBottomWidth": 1
    },

    "halfHeight": {
        "flex": 0.5,
        "backgroundColor": "blue"
    },
    "quarterHeight": {
        "flex": 0.25,
        "backgroundColor": "red"
    }
};

export default styles;