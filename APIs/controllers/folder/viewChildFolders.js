const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const { Folders } = require('../../models/db')

// * TO VIEW CHILD FOLDERS
exports.viewChildFolders = async (req, res) =>{
    try {
        const childFolders = await Folders.findById(req.params.folder_id).populate('folders')
        res.status(200).json(httpStatus200(childFolders))
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}