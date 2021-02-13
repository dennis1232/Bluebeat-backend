const beatService = require('./beat.service')
const logger = require('../../services/logger.service')

async function getBeat(req, res) {
    const beat = await beatService.getById(req.params.id)
    res.send(beat)
}

async function getBeats(req, res) {
    try {
        const beats = await beatService.query(req.query)
        res.send(beats)
    } catch (err) {
         // logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot get beats' })

    }
}

async function deleteBeat(req, res) {
    try {
        await beatService.remove(req.params.id)
        res.end()
    } catch (err) {
        // logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete beat' })
    }
}
 

async function updateBeat(req, res) {
    const beat = req.body;
    await beatService.update(beat)
    res.send(beat)
}

async function addBeat(req, res) {
    const beat = req.body;
    await beatService.add(beat)
    res.send(beat)
}



module.exports = {
    getBeat,
    getBeats,
    deleteBeat,
    updateBeat,
    addBeat
}