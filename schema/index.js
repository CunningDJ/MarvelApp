'use strict';

// SET
const characterId = require('./characterId');
const comicId = require('./comicId');
const creatorId = require('./creatorId');
const eventId = require('./eventId');
const seriesId = require('./seriesId');
const storyId = require('./storyId');


// ID
const characters = require('./characters');
const comics = require('./comics');
const creators = require('./creators');
const events = require('./events');
const series = require('./series');
const stories = require('./stories');


const schema = {
    id: {
        character: characterId,
        comic: comicId,
        creator: creatorId,
        event: eventId,
        series: seriesId,
        story: storyId
    },
    set: {
        character: characters,
        comic: comics,
        creator: creators,
        event: events,
        series: series,
        story: stories
    }
}

export default schema;