'use strict';

//import request from 'request';

import md5hex from 'md5-hex';
import axios from 'axios';

import keys from './keys';

//  MARVEL
const CHARACTERS_PATH = 'https://gateway.marvel.com:443/v1/public/characters';
const TOTAL_CHARACTERS = 1490;
const CHARACTER_LIST_SIZE = 20;

function randomCharacterListOffset() {
  return Math.floor(Math.random() * (TOTAL_CHARACTERS - CHARACTER_LIST_SIZE));
}

export function processCharacters(cb) {
  let { key, secretKey } = keys.marvel;
  let ts = new Date().getTime();
  let hashContent = ts + secretKey + key;
  let hash = md5hex(hashContent);

  axios.get(
    CHARACTERS_PATH,
    {
      params: {
        apikey:  key,
        ts: ts,
        hash: hash,
        offset: randomCharacterListOffset()
      },
      responseType: 'json'
    }
  )
  .then((response) => {
    let { results } = response.data.data;
    return cb(null, results);
  })
  .catch((err) => {
    return cb(err, null);
  });
}


let api = {
  processCharacters
}

export default api;