const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('../models/book');

module.exports.addBook = function(data, user) {
    return new Promise(function (resolve, reject) {     
        let book = new Book({
            title: data.title,
            subtitle: data.subtitle,
            author: data.author,
            genre: data.genre,
            publisher: data.publisher,
            year: data.year,
            pages: data.pages,
            uploader: user._id
        });
        book.save()
        .then((message) => {
            resolve(`Book ${book.title} was uploaded successfully`);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

module.exports.deleteBook = function(data, user) {
    return new Promise(function (resolve, reject) {
        Book.deleteOne({_id : data, uploader : user._id}).exec()
        .then((message) => {
            resolve(`Book with id ${data} was deleted`);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.updateBook = function(data, user) {
    return new Promise(function (resolve, reject) {
        Book.updateOne({_id: data.id, uploader: user._id}, { $set: data }).exec()
        .then((message) => {
            resolve(`Book with id ${data.id} was updated`);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.findBookByTitle = function(data, user) {
    return new Promise(function (resolve, reject) {
        Book.findOne({title : data, uploader : user._id}).exec()
        .then((message) => {
            resolve(message);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.findAllBooks = function(user) {
    return new Promise(function (resolve, reject) {
        Book.find({ uploader : user._id}).exec()
        .then((message) => {
            resolve(message);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.findBooksByGenre = function(data, user) {
    return new Promise(function (resolve, reject) {
        Book.find({ genre : data, uploader : user._id }).exec()
        .then((message) => {
            resolve(message);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.findBooksByAuthor = function(data, user) {
    return new Promise(function (resolve, reject) {
        Book.find({ author : data, uploader : user._id }).exec()
        .then((message) => {
            resolve(message);
        })
        .catch((err) => {
            reject(err);
        });
    });
}