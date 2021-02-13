
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('beat')
    try {
        const beats = await collection.find(criteria).toArray();
        beats.forEach(beat => delete beat.password);
        return beats
    } catch (err) {
        console.log('ERROR: cannot find beats')
        throw err;
    }
}

async function getById(beatId) {
    const collection = await dbService.getCollection('beat')
    try {
        const beat = await collection.findOne({ '_id': ObjectId(beatId) })
        // delete beat.password
        return beat
    } catch (err) {
        console.log(`ERROR: while finding beat ${beatId}`)
        throw err;
    }
}

async function remove(beatId) {
    const collection = await dbService.getCollection('beat')
    try {
        await collection.deleteOne({ '_id': ObjectId(beatId) })
    } catch (err) {
        console.log(`ERROR: cannot remove beat ${beatId}`)
        throw err;
    }
}

async function update(beat) {
    const collection = await dbService.getCollection('beat')
    beat._id = ObjectId(beat._id);
    try {
        await collection.replaceOne({ _id: beat._id },  beat )
        return beat
    } catch (err) {
        console.log(`ERROR: cannot update beat ${beat._id}`)
        throw err;
    }
}

async function add(beat) {
    const collection = await dbService.getCollection('beat')
    try {
        await collection.insertOne(beat);
        return beat;
    } catch (err) {
        console.log(`ERROR: cannot insert beat`)
        throw err;
    }
}


function  _buildCriteria(filterBy) {
    // console.log('filterByfilterBy', filterBy);
    const criteria = {};
    if (filterBy.genre === 'ALL' && filterBy.name === '') {
        return criteria
    }
    if (filterBy.genre && filterBy.genre !== 'ALL') {
        criteria.genre = filterBy.genre
    }
    // if (filterBy.name && filterBy.name !== '') {
    //     criteria.name = filterBy.name.toUpperCase()
    // }

    return criteria
}
