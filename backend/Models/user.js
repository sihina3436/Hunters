
const bcrypt = require("bcrypt");
const { Schema, model, default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    contact: { type: Number },
    password: { type: String, require: true },
    role: {
        type: String, default: 'user'
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});




const User = mongoose.model("User", userSchema);
module.exports = User;