const mongoose = require("mongoose");

const folderObjects = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    tags: {
        type: [String],
    },
    color: {
        type: String,
    },
    createdOn: {
        type:  Date,
        default: Date.now
    },
    lastAccessedOn: {
        type:Date,
        default: Date.now,
    },
    lastModifiedOn: {
        type:  Date,
        default:  Date.now
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    childFolders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "folderObject",
        default: [],
    },
    files: {
        type:  [String],
        default: []
    }

},
{ autoCreate: true }
);

const FolderObjects = mongoose.model("folderObject", folderObjects);

module.exports = FolderObjects;