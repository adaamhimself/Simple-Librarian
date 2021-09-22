const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var bookSchema = new Schema({
    "title": String,
    "subtitle" : String,
    "author": String,
    "genre": String,
    "edition" : String,
    "publisher" : String,
    "year" : String,
    "pages" : Number,
    "uploader" : String
});

module.exports = Mongoose.model('book', bookSchema);