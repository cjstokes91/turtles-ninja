const quizResult = require('../models/quizResult');

module.exports = {
    index,
    newResults,
    getResults,
    deleteOne
    // getAllResults,
}
async function newResults(req, res) {
    req.body.user = req.user._id
    const result = await quizResult.create(req.body)
    res.status(201).json(result)
}

async function index(req, res) {
    const quizResults = await quizResult.find({ user: req.user._id });
    res.status(200).json(quizResults);
}

async function getResults(req, res) {
    try {
        const result = await quizResult.find({ user: req.body })
        res.status(200).json({ result })
    } catch (error) {
    }
}

async function deleteOne(req, res) {
    try {

        const deletedResult = await quizResult.findByIdAndRemove(req.params.id);
        console.log('hitting delete', deletedResult)
        res.status(200).json(deletedResult)

    } catch (error) {
        console.log(error)
    }
}
        // async function getAllResults(req, res) {
        //     const allResults = await quizResult.find({})
        //     res.status(200).json({ allResults })
        // }

        // get all users results 