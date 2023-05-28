const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        require: true
    },

    password: String,
    job: String

});

const theUser = mongoose.model('User', user);
module.exports = theUser; 