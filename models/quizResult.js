let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let quizResultsSchema = new Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, name: String, ref: 'User' }],
    name: { type: String },
    age: { type: Number },
    weapon: { type: String },
    personality: { type: String }

}, {
    timestamps: true
});
module.exports = mongoose.model('quizResult', quizResultsSchema)