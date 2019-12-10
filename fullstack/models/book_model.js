var mongoose = require('mongoose');



var bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, },
    description: { type: String, require: true, },
    genreID: { type: String, require: true }
})
module.exports = mongoose.model('books', bookSchema);