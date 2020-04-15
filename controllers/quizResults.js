const quizResult = require('../models/quizResult');

module.exports = {
    show,
    newResults
}

async function newResults(req, res) {
    const result = await quizResult.create(req.body);
    res.status(201).json(result)
}



async function show(req, res) {
    const quizResult = await quizResult.findById(req.params.id);
    res.status(200).json(quizResult);
}