const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    board_name: {
        type: String,
        required: true,
    },

    board_desc: {
        type: String,
        default: null
    },

    board_img: {
        type: String,
        default: null
    },

    board_data: {
        type: JSON,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    updated_at: {
        type: Date,
        default: Date.now()
    }

},
    { autoCreate: true }
);

const Boards = mongoose.model("boards", boardSchema);

module.exports = Boards;