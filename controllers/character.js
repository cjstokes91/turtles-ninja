const Character = require('../../models/character');

module.exports = {
    show
}

async function show(req, res) {
    const characters = await Character.findById(req.params.id);
    res.status(200).json(characters);
}