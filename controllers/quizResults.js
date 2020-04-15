const quizResult = require('../../models/quizResult');

module.exports = {
    show
}

async function show(req, res) {
    const quizResult = await quizResult.findById(req.params.id);
    res.status(200).json(quizResult);
}