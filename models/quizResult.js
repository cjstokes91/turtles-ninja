let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let quizResultsSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    character: {}
}, {
    timestamps: true
});
module.exports = mongoose.model('quizResult', quizResultsSchema)