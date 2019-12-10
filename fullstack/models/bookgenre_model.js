var mongoose = require('mongoose');


var bookGenreSchema = new mongoose.Schema({

    name: { type: String, require: true, unique: true },

})
module.exports = mongoose.model('bookGenres', bookGenreSchema);