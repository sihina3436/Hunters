const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String, default: 'user'
    },
    profileImage: String,
    bio: { type: String, maxlength: 200 },
    profession: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// hash password before saving
userSchema.pre('save', async function (next) {
   const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema); // Changed 'userShecma' to 'userSchema'
module.exports = User;
