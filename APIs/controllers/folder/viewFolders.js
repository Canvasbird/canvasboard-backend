const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const { Users } = require('../../models/db')

// * TO VIEW USER FOLDERS
exports.viewUserFolders = async (req, res) =>{
    try {
        const rootFolders = await Users.findById(req.params.user_id).populate('folder')
        res.status(200).json(httpStatus200(rootFolders))
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}