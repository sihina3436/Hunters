const {Schema, model} = require('mongoose');

const userShecma = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    phoneNumber:{type:Number},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {
        type: String, default: 'user'
    },
   });

   module.exports = model("User", userSchema);
   