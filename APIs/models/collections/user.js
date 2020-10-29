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

    folders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Folder",
    }]

},
    { autoCreate: true }
);

userSchema.methods.addFolder = function(folder_id){
    this.folders.push(folder_id)
    this.save();
    return "Folder Saved!"
}

userSchema.methods.removeFolderReference = function(folder_id){
    var folders = this.folders;
    const index = folders.find((folder, index)=>{
        if (folder===folder_id) return index
    })
    folders.splice(index, 1);
    this.folders = folders;
    this.save();
    return "Removed Folder!"
}
const Users = mongoose.model("users", userSchema);

module.exports = Users;