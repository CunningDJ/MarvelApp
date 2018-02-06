'use strict';

//import request from 'request';

import md5hex from 'md5-hex';
import axios from 'axios';

import keys from './keys';

/*function md5(hc) {
  return {
    digest: function() {
      return '1234';
    }
  }
}*/

//  MARVEL
const CHARACTERS_PATH = 'https://gateway.marvel.com:443/v1/public/characters';
//const CHARACTERS_PATH = 'https://gateway.marvel.com:443/v1/public/characters';

export function processCharacters(cb) {
  let { key, secretKey } = keys.marvel;
  let ts = new Date().getTime();
  let hashContent = ts + secretKey + key;
  let hash = md5hex(hashContent);
  //let hash = cryptoJS.createHash('md5').update(hashContent).digest('hex');
  console.log('key: %s secretKey: %s ts: %s', key, secretKey, ts);
  axios.get(
    CHARACTERS_PATH,
    {
      params: {
        apikey:  key,
        ts: ts,
        hash: hash
      },
      responseType: 'json'
    }
  )
  .then((response) => {
    console.log('resCharacters #:', response.data);
    let { results } = response.data.data;
    return cb(null, results);
  })
  .catch((err) => {
    return cb(err, null);
  });
}

/*
request.get({ 
    url: CHARACTERS_PATH, 
    qs: { 
      apikey:  key,
      ts: ts,
      hash: hash
    },
    json: true
  }, function(err, response) {
    if (err) {
      return cb(err, null);
    }
    cb(null, response.body.data.results);
  });
*/




let api = {
  processCharacters
}

export default api;