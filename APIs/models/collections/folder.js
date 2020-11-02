const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    folder_name:{
        type:String,
        required:true
    },
    folder_title:{
        type:String,
    },
    folder_tag:{
        type:String
    },
    created_on:{
        type:Date,
        default:Date.now()
    },
    last_accessed_on:{
        type:Date
    },
    last_modified_on:{
        type:Date
    },
    is_nested_folder:{
        type:Boolean,
    },
    folders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Folder"
        },
    ],
    files:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"File"
        }
    ],

})


folderSchema.methods.addChildFile = function(file_id){
    this.files.push(file_id)
    this.save();
    return "File Saved!"
}

folderSchema.methods.removeFileReference = function(file_id){
    var files = this.files;
    const index = files.find((file, index)=>{
        if (file===file_id) return index
    })
    files.splice(index, 1);
    this.files = files;
    this.save();
    return "File Removed!"
}

folderSchema.methods.addChildFolder = function(folder_id){
    this.folders.push(folder_id)
    this.save();
    return "Folder Added!"
}

folderSchema.methods.removeChildFolderReference = function(folder_id){
    var folders = this.folders;
    const index = folders.find((folder, index)=>{
        if (folder===folder_id) return index
    })
    folders.splice(index, 1);
    this.folders = folders;
    this.save();
    return "Folder Removed!"
}

module.exports = mongoose.model('Folder', folderSchema);