var mongoose = require('mongoose');



var bookReviewSchema = new mongoose.Schema({
    Username: { type: String, required: true, },
    Rating: { type: Number, require: true },
    status: { type: String, enum: ['Submitted', 'Accepted', 'Rejected'], default: 'Submitted' },
    description: { type: String, require: true, },

})
module.exports = mongoose.model('bookReviews', bookReviewSchema);