const mongoose = require("mongoose");

const passwordReset = new mongoose.Schema({

    reset_token: {
        type: String,
        required: true,
        unique: true
    },
    issued_on: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    used_on: {
        type: Date,
        default: null
    },
    is_used: {
        type: Boolean,
        default: false
    },

},
    { autoCreate: true }
);

const PasswordReset = mongoose.model("passwordReset", passwordReset);

module.exports = PasswordReset;