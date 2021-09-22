const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var userSchema = new Schema({
    "email": {
        type: String,
        unique: true
    },
    "password": String,
    "name": String
});

module.exports = Mongoose.model('user', userSchema);