require("dotenv").config()

const mongoose = require("mongoose");

console.log('process.env.url',process.env.url)
const connection = mongoose.connect(process.env.url);

module.exports = { connection };