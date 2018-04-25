import { Platform, Dimensions } from 'react-native';
import { isIOS, isIphoneX } from '../lib/util';

const color = {
    primary: '#10069F',
    secondary: '#7C2855',
    tertiary: '#AF272F'
};


let iosStatusBarHeight = isIphoneX() ? 35 : 20;
let mastheadHeight = 65;
let headerSectionHeight = iosStatusBarHeight + mastheadHeight;
let bodySectionHeight = Dimensions.get('window').height - headerSectionHeight;

var styles = {
    container: {
        flex: 1.0,
        flexDirection: "column",
        backgroundColor: color.secondary
    },
    headerSection: {
        height: headerSectionHeight
    },
    bodySection: {
        height: bodySectionHeight
    },
    masthead: {
        height: 65,
        backgroundColor: color.secondary
    },
    mastheadText: {
        fontWeight: "bold",
        fontSize: 40,   // 50
        color: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    statusBar: {
        height: Platform.select({
            ios: iosStatusBarHeight,
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
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'white'
    },
    color: color
};

export default styles;