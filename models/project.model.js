const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {type: String, required: true, max: 100},
    dateCreated: {type: Date, required: true},
});


// Export the model
module.exports = mongoose.model('Project', ProjectSchema);