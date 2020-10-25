const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },

    verified: {
        type: Boolean,
        default: false
    },

    institute_name: {
        type: String,
        default: null
    },
    root_folders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "folderObject",
        default: [],
    },
    root_files: {
        type:  [String],
        default: []
    }

},
    { autoCreate: true }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;