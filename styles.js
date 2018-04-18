import { Platform } from 'react-native';
import { isIOS, isIphoneX } from './util';

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
        backgroundColor: "#1eff8d"
    },
    mastHead: {
        height: 75,
        backgroundColor: "#ff1e90"
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
        backgroundColor: "dodgerblue"
        
    },
    movieListItem: {
        height: 100,
        backgroundColor: "cornsilk",
        borderColor: "midnightblue",
        borderBottomWidth: 1
    },
    characterListItem: {
        height: 100,
        backgroundColor: "dodgerblue",
        borderColor: "midnightblue",
        borderBottomWidth: 1
    },
    fullScreenImage: {
        flex: 1,
        flexDirection: 'column'
    },

    halfHeight: {
        flex: 0.5,
        backgroundColor: "blue"
    },
    quarterHeight: {
        flex: 0.25,
        backgroundColor: "red"
    }
};

export default styles;