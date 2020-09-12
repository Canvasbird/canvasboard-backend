const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

    email_id: {
        type: String,
        required: true
    },

    institute_name: {
        type: String,
        default: null
    }

},
    { autoCreate: true }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;