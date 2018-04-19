import { Platform } from 'react-native';
import { isIOS, isIphoneX } from './util';

const color = {
    primary: '#10069F',
    secondary: '#7C2855',
    tertiary: '#AF272F'
};

function iosStatusBarHeight() {
    if (isIphoneX()) {
        return 35;
    } else {
        return 20;
    }
}

var styles = {
    container: {
        flex: 0.7,
        flexDirection: "column",
        backgroundColor: color.tertiary
    },
    mastHead: {
        height: 65,
        backgroundColor: color.secondary
    },
    mastHeadText: {
        fontWeight: "bold",
        fontSize: 50,
        color: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    statusBar: {
        height: Platform.select({
            ios: iosStatusBarHeight(),
            android: 0
        }),
        backgroundColor: color.secondary
    },
    characterListItem: {
        height: 100,
        backgroundColor: color.primary,
        borderColor: "dodgerblue",
        borderBottomWidth: 1
    },
    textSubHeader: {
        color: 'white',
        fontWeight: 'bold'
    },
    textMain: {
        color: 'white'
    },
    fullScreenImage: {
        flex: 1,
        flexDirection: 'column'
    },
    charactersRefreshButton: {
        color: color.tertiary,
        title: 'Refresh'
    },
    color: color
};

export default styles;