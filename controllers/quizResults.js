const quizResult = require('../models/quizResult');

module.exports = {
    index,
    newResults
}
async function newResults(req, res) {
    console.log('this is new result')
    console.log(req.user)
    console.log('below is body')
    console.log(req.body)
    req.body.user = req.user._id
    const result = await quizResult.create(req.body)
    console.log(req.user)
    res.status(201).json(result)
}
async function index(req, res) {
    const quizResults = await quizResult.find({ user: req.user._id });
    res.status(200).json(quizResults);
}