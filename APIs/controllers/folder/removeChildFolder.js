const {Folders} = require('../../models/db')
const { httpStatus200, httpStatus500} = require('../../status/httpStatus')

exports.removeChildFolder = async (req, res) =>{
    try {
        await Folders.findByIdAndDelete(req.body.nested_folder_id)
        try {
            const rootFolder = await Folders.findById(req.body.folder_id)
            const message =  await rootFolder.removeChildFolderReference(req.body.nested_folder_id)
            res.status(200).json(httpStatus200(null, message))
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    } catch (error) {
      if(error) res.status(500).json(httpStatus500(error))
    }
}