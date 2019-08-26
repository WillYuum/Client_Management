const mongoose = require('mongoose');

var contacts_file = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    contact_username: String,
    date_created: Date,
})

module.exports = mongoose.model('contacts_file', contacts_file)