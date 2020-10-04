const mongoose = require("mongoose");

const sharedFilesSchema = new mongoose.Schema({

    filepath: {
        type: String,
        required: true,
        unique: true
    },

    fileowner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

},
{ autoCreate: true }
);

const SharedFiles = mongoose.model("sharedFile", sharedFilesSchema);

module.exports = SharedFiles;