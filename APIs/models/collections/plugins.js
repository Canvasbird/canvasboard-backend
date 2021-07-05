const mongoose = require("mongoose");

const pluginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tagline: {
        type: String,
        required: true
    },
    details: {
        type: [Object],
        required: true
    }
});

module.exports = mongoose.model('Plugin', pluginSchema);
