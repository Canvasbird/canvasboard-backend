const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const {Users, Folders} = require('../../models/db')

// * REMOVE FOLDER 
exports.removeFolder = async (req, res) =>{
    try {
        await Folders.findByIdAndDelete(req.body.folder_id)
        try {
            const user = await Users.findById(req.body.user_id)
            const message = user.removeFolderReference(req.body.folder_id)
            res.status(200).json(httpStatus200(null, message))  
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    } catch (error) {
      if(error) res.status(500).json(httpStatus500(error))
    }
}