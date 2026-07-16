const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        unique: true
    },
    MobileNo: {
        type: Number,
        unique: true
    },
    Password: String
});

const UserModel = new mongoose.model("users", UserSchema);

module.exports = UserModel;