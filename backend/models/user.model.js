const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: String,
    
    role: {type: String, required: true},
    wallet:{type: Number, required: true}
})

const userModel = mongoose.model("user", schema);

module.exports = { userModel };

const obj = {
    "name": "test user 1",
    "email": "testuser1@gmail.com",
    "password": "testuser",
    "wallet": "100"
}