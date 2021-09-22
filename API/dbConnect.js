require('dotenv').config();
const mongoose = require("mongoose");

module.exports.connect = function() {
    return new Promise(function (resolve, reject) {
        mongoose.connect(process.env.MONGO_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on("open", () => {
            console.log("Database connection open.");
            resolve();
        });
        mongoose.connection.on("error", (err) => {
            console.error(error);
            reject(err);
        });
    });
}