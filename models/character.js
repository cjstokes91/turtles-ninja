let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let characterSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    weapon: { type: String },
    personality: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Character', characterSchema)