const quizResult = require('../models/quizResult');

module.exports = {
    index,
    newResults,
    getResults,
    deleteOne,
}
async function newResults(req, res) {
    console.log(req.body)
    const result = await quizResult.findOne({ name: req.body.name })
    if (result) {
        if (result.user.includes(req.user._id)) {
            res.status(201).json(result)
        } else {
            result.user.push(req.user)
            await result.save()
            res.status(201).json(result)
        }

    } else {
        const newResult = await quizResult.create(req.body)
        newResult.user.push(req.user)
        await newResult.save()
        res.status(201).json(newResult)
    }
}

async function index(req, res) {
    console.log('hitting index')
    const quizResults = await quizResult.find({});
    res.status(200).json(quizResults);
}

async function getResults(req, res) {
    try {
        const result = await quizResult.find({ user: req.user._id })
        console.log('this is req body ', result)
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
