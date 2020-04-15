const quizResult = require('../models/quizResult');

module.exports = {
    show,
    newResults
}

async function newResults(req, res) {
    console.log('hello from rescontrller', req.body)
    res.json({ data: 'hello' })

}



async function show(req, res) {
    const quizResult = await quizResult.findById(req.params.id);
    res.status(200).json(quizResult);
}