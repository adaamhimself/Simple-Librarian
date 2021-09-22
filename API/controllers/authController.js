const express = require('express');
const app = express();
const authService = require('../services/auth-service');
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
            authService.registerUser(data)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        }).catch((err) => reject(err));
    });
}

module.exports.login = function(data) {
    return new Promise(function (resolve, reject) {
        authService.findUser(data)
        .then((user) => {
            var payload = { 
                _id: user._id,
                userName: user.email,
                role: user.role
            };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            resolve(token);
        })
        .catch((err) => {
            reject(err);
        });
    });
}
