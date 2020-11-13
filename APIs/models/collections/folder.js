const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  folder_name: {
    type: String,
    required: true,
  },
  folder_title: {
    type: String,
  },
  folder_tag: {
    type: String,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  last_accessed_on: {
    type: Date,
  },
  last_modified_on: {
    type: Date,
  },
  is_nested_folder: {
    type: Boolean,
  },
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

folderSchema.methods.addChildFile = function (file_id) {
  this.files.push(file_id);
  this.save();
  return "File Saved!";
};

function returnIndex(files, file_id) {
  for (let i = 0; i < files.length; i++) {
    if (String(files[i]) === String(file_id)) {
      return i;
    }
  }
}

folderSchema.methods.removeFileReference = function (file_id) {
  var files = this.files;
  const index = returnIndex(files, file_id);
  if (index !== undefined) {
    files.splice(index, 1);
    this.files = files;
    this.save();
    return "File Removed!";
  } else {
    return "File Does not exists";
  }
};

folderSchema.methods.addChildFolder = function (folder_id) {
  this.folders.push(folder_id);
  this.save();
  return "Folder Added!";
};

folderSchema.methods.removeChildFolderReference = function (folder_id) {
  var folders = this.folders;
  const index = folders.find((folder, index) => {
    if (String(folder) === String(folder_id)) return index;
  });
  if (index !== undefined) {
    folders.splice(index, 1);
    this.folders = folders;
    this.save();
    return "Folder Removed!";
  } else {
    return "Folder does not exists!";
  }
};

module.exports = mongoose.model("Folder", folderSchema);
