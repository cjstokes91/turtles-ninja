const quizResult = require('../models/quizResult');

module.exports = {
    show,
    newResults
}
async function newResults(req, res) {
    console.log('this is new result')
    console.log(req.user)
    console.log(req.body)
    const result = await quizResult.create(req.body)
    console.log(req.user, '<------')
    res.status(201).json(result)
}
async function show(req, res) {
    const quizResult = await quizResult.findById(req.params.id);
    res.status(200).json(quizResult);
}