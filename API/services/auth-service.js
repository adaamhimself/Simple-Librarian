const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.registerUser = function(data) {
    return new Promise(function (resolve, reject) {
        let newUser = new User(data);
        if (newUser.role) newUser.role = "user";
        newUser.save((err) => {
            if(err) {
                if (err.code == 11000) {
                    reject("User Name in use");
                } else {
                    reject("Error creating the user: " + err);
                }
            } else {
                resolve("User " + data.email  + " created");
            }
        })
    });
}

module.exports.findUser = function(data) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email : data.email})
        .exec()
        .then(user => {
            bcrypt.compare(data.password, user.password).then(res => {
                if (res === true) {
                    resolve(user);
                } else {
                    reject("Incorrect password for " + data.email);
                }
            });
        }).catch((err) => {
            reject("User not found: " + data.email);
        });
    });
}