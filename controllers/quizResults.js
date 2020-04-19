const quizResult = require('../models/quizResult');

module.exports = {
    index,
    newResults,
    getMyResults,
    deleteOne,
}
async function newResults(req, res) {
    // let result = await quizResult.findOne({ name: req.body.name })
    // console.log(result)
    // if (result) {
    //     if (result.user.includes(req.user._id)) {
    //         res.status(201).json(result)
    //     } else {
    //         result.user.push(req.user)
    //         await result.save()
    //         res.status(201).json(result)
    //     }
    // } else {
    let result = await quizResult.create(req.body)
    result.user.push(req.user)
    await result.save()
    res.status(201).json(result)
    // }
}

async function index(req, res) {
    console.log('hitting index')
    const quizResults = await quizResult.find({});
    res.status(200).json(quizResults);
}

async function getMyResults(req, res) {
    try {
        const results = await quizResult.find()
        console.log('this is req body ', results)
        const myResults = results.filter(result => result.user.includes(req.user._id))
        res.status(200).json(myResults)
    } catch (error) {
        console.log(error)
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
