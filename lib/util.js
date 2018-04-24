import { Platform, Dimensions } from 'react-native';

const IPHONE_X_SMALL_DIM = 812;
const WINDOW_DIM = Dimensions.get('window');

export function isIOS() {
  return (Platform.OS = 'ios');
}

export function isIphoneX() {
    let { height, width } = WINDOW_DIM;
    return ( isIOS() && (height === IPHONE_X_SMALL_DIM || width === IPHONE_X_SMALL_DIM) );
}

export function checkInty(val) {
  // checks if int or string of int
  return (parseInt(val) !== NaN && parseInt(val) === parseFloat(val));
}

export function checkInt(val) {
  return (typeof(val) == 'number' && parseInt(val) === parseFloat(val))
}

export function undef(val) {
    return typeof(val) === 'undefined';
}