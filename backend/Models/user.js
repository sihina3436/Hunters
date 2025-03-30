const { Schema, model, default: mongoose } = require('mongoose');

const userShecma = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    contact: { type: Number },
    password: { type: String, require: true },
    role: {
        type: String, default: 'user'
    },
});

const User = mongoose.model("User", userShecma);
module.exports = User;