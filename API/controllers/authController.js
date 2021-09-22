const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

// JWT
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'fkpm3FPpZCyG%d@@UI8IPBoxw';
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    if (jwt_payload) {
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.email, 
            role: jwt_payload.role }); 
    } else {
        next(null, false);
    }
});
app.use(passport.initialize());
passport.use(strategy);

module.exports.register = function(data) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(data.password, 10)
        .then(hash => {
            data.password = hash;
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
            });
        });
    });
}

module.exports.login = function(data) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email : data.email})
        .exec()
        .then(user => {
            bcrypt.compare(data.password, user.password).then(res => {
                if (res === true) {
                    var payload = { 
                        _id: user._id,
                        userName: user.email,
                        role: user.role
                    };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    resolve(token);
                } else {
                    reject("Incorrect password for " + data.email);
                }
            });
        }).catch((err) => {
            reject("User not found: " + data.email);
        });
    });
}
