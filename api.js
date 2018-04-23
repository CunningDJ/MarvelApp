'use strict';

//import request from 'request';
import join from 'url-join';

import md5hex from 'md5-hex';
import axios from 'axios';

import keys from './keys';
import { checkInt, checkInty } from './util';

// CONSTANTS: keys
const { key, secretKey } = keys;


//  CONSTANTS: paths

const GATEWAY_BASE_PATH = 'https://gateway.marvel.com:443/v1/public';

const COMICS = 'comics',
      EVENTS = 'events',
      SERIES = 'series',
      STORIES = 'stories',
      CHARACTERS = 'characters',
      CREATORS = 'creators';

// TODO: Take out the separate definitions of the base path, subpath, and error variables?  Could just use the convenience
//       functions, but this frontloads the work.

const CHARACTERS_BASE_PATH = gateP(CHARACTERS),
      COMICS_BASE_PATH = gateP(COMICS),
      CREATORS_BASE_PATH = gateP(CREATORS),
      EVENTS_BASE_PATH = gateP(EVENTS),
      SERIES_BASE_PATH = gateP(SERIES),
      STORIES_BASE_PATH = gateP(STORIES);


const SUBPATHS = {
  'characters': [
    COMICS,
    EVENTS,
    SERIES,
    STORIES
  ],
  'comics': [
    CHARACTERS,
    CREATORS,
    EVENTS,
    STORIES
  ],
  'creators': [
    COMICS,
    EVENTS,
    SERIES,
    STORIES
  ],
  'events': [
    CHARACTERS,
    COMICS,
    CREATORS,
    SERIES,
    STORIES
  ],
  'series': [
    CHARACTERS,
    COMICS,
    CREATORS,
    EVENTS,
    STORIES
  ],
  'stories': [
    CHARACTERS,
    COMICS,
    CREATORS,
    EVENTS,
    SERIES
  ]
};

// CONSTANTS: error messages

const CHARACTERS_SUBPATH_ERR = _subPathErr(CHARACTERS),
      COMICS_SUBPATH_ERR = _subPathErr(COMICS),
      CREATORS_SUBPATH_ERR = _subPathErr(CREATORS),
      EVENTS_SUBPATH_ERR = _subPathErr(EVENTS),
      SERIES_SUBPATH_ERR = _subPathErr(SERIES),
      STORIES_SUBPATH_ERR = _subPathErr(STORIES);

// CONSTANTS: characters

// TODO: remove? (specific use case)
const TOTAL_CHARACTERS = 1490;


// FUNCTIONS: character listing (test function)

function randomCharacterListOffset(characterListSize) {
  return Math.floor(Math.random() * (TOTAL_CHARACTERS - characterListSize));
}

function getMarvelCharacters(listSize, options, cb) {
  /*
  options: {
    rand: bool [default:false],
    offset: int [default:0],
    nameStartsWith: string [default:undefined],
    orderBy: string [default:undefined, options:['name', 'modified', '-name', '-modified']]
  }
  */

  // establishing defaults
  if (typeof(options) == 'undefined') {
    options = {};
  } else if (typeof(options) !== 'object') {
    throw TypeError('[getMarvelCharacters] options must be an object');
  }

  let { rand, offset, nameStartsWith, orderBy } = options;

  if (typeof(rand) == 'undefined') {
    rand = false;
  } else if (typeof(rand) !== 'boolean') {
    throw TypeError('[getMarvelCharacters] options.rand must be a boolean');
  }

  if (typeof(offset) == 'undefined') {
    if (rand) {
      offset = randomCharacterListOffset(listSize);
    } else {
      offset = 0;
    }
  } else {
    if (rand) {
      throw Error('[getMarvelCharacters] Cannot have random: true and a defined offset for getMarvelCharacters');
    } else if (!checkInt(offset)) {
      throw TypeError('[getMarvelCharacters] options.offset must be an int');
    }
  }

  axios.get(
    CHARACTERS_BASE_PATH,
    apiParams({ 
      offset: offset,
      nameStartsWith: nameStartsWith,
      orderBy: orderBy
    })
  )
  .then((response) => {
    // JSON response == response.data
    let { results } = response.data.data;
    return cb(null, results);
  })
  .catch((err) => {
    return cb(err, null);
  });
}


function getMarvelCharacter(characterId, cb) {
  if (!checkInty(characterId)) {
    throw TypeError('[getMarvelCharacer] characterId must be int or string int');
  }

  var reqPath = charP(characterId);
  axios.get(
    reqPath,
    apiParams({}),
  )
  .then((response) => {
    return (cb(null, response.data.data.results[0]));
  })
  .catch((err) => {
    return (cb(err, null));
  });
}



// FUNCTIONS: API paths

function gateP(relPath) {
  // gateway path
  return join(GATEWAY_BASE_PATH, relPath);
}


function charP(characterId, subPath) {
  // characters path (with optional ID & subpath)
  return _apiPath(CHARACTERS_BASE_PATH, SUBPATHS[CHARACTERS], CHARACTERS_SUBPATH_ERR, characterId, subPath);
}


function comicsP(comicId, subPath) {
  // comics path (with optional ID & subpath)
  return _apiPath(COMICS_BASE_PATH, SUBPATHS[COMICS], COMICS_SUBPATH_ERR, comicId, subPath);
}


function creatorsP(creatorId, subPath) {
  // creators path (with optional ID & subpath)
  return _apiPath(CREATORS_BASE_PATH, SUBPATHS[CREATORS], CREATORS_SUBPATH_ERR, creatorId, subPath);
}


function eventP(eventId, subPath) {
  // events path (with optional ID & subpath)
  return _apiPath(EVENTS_BASE_PATH, SUBPATHS[EVENTS], EVENTS_SUBPATH_ERR, eventId, subPath);
}


function seriesP(seriesId, subPath) {
  // series path (with optional ID & subpath)
  return _apiPath(SERIES_BASE_PATH, SUBPATHS[SERIES], SERIES_SUBPATH_ERR, seriesId, subPath);
}


function storiesP(storiesId, subPath) {
  // stories path (with optional ID & subpath)
  return _apiPath(STORIES_BASE_PATH, SUBPATHS[STORIES], STORIES_SUBPATH_ERR, storiesId, subPath);
}



// FUNCTIONS: util

function _goodSubPath(subpath, acceptedSubPaths) {
  return acceptedSubPaths.indexOf(subPath) !== -1;
}


function _subPathErr(pathType) {
  return 'Invalid \'' + pathType + '\' subpath!';
}


function _apiPath(basePath, acceptedSubPaths, errMsg, id, subPath) {
  let returnPath = basePath;
  if (typeof(id) === 'undefined') {
    return returnPath;
  } else {
    if (!checkInty(id)) {
      return TypeError('[_apiPath] ID must be int or string int');
    } else if (checkInt(id)) {
      id = id.toString();
    }

    returnPath = join(returnPath, id);
    if (typeof(subPath) === 'undefined') {
      return returnPath;
    } else {
      if (_goodSubPath(subPath, acceptedSubPaths)) {
        return join(returnPath, subPath);
      } else {
        throw Error(errMsg);
      }
    }
  }
}

function apiParams(query) {
  let params = Object.assign(_apiBaseParams(), query);

  return {
    params: params,
    responseType: 'json'
  }
}

function _apiBaseParams() {
  let ts = new Date().getTime();
  let hashContent = ts + keys.marvel.secretKey + keys.marvel.key;
  let hash = md5hex(hashContent);

  return {
    apikey:  keys.marvel.key,
    ts: ts,
    hash: hash
  }
}


// EXPORTS

let api = {
  getMarvelCharacters,
  getMarvelCharacter,
  charP,
  comicsP,
  creatorsP,
  eventP,
  seriesP,
  storiesP
}

export default api;