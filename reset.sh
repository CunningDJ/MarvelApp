#!/usr/bin/env bash

watchman watch-del-all;

rm -rf node_modules/;
npm cache clean;
npm install;

rm -rf $TMPDIR/react-*;
rm -rf $TMPDIR/haste-map-react-native-packager-*;
