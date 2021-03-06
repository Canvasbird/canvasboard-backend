const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
      required: true,
    },

    email_id: {
      type: String,
      required: true,
      unique: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    institute_name: {
      type: String,
      default: null,
    },

    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
  },
  { autoCreate: true }
);

userSchema.methods.addFolder = function (folder_id) {
  this.folders.push(folder_id);
  this.save();
  return "Folder Saved!";
};

function returnIndex(folders, folder_id) {
  for (let i = 0; i < folders.length; i++) {
    if (String(folders[i]) === String(folder_id)) {
      return i;
    }
  }
}

userSchema.methods.removeFolderReference = function (folder_id) {
  var folders = this.folders;
  const index = returnIndex(folders, folder_id);
  if (index !== undefined) {
    folders.splice(index, 1);
    this.folders = folders;
    this.save();
    return "Removed Folder!";
  } else {
    return "Folder does not exists!";
  }
};
const Users = mongoose.model("users", userSchema);

module.exports = Users;
