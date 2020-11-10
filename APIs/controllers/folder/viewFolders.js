const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const { Users } = require('../../models/db')

exports.viewUserFolders = async (req, res) =>{
    try {
        const user = await Users.findById(req.params.user_id) 
        const folders = await user.populate('folders').execPopulate()
        res.status(200).json(httpStatus200(folders.folders, null))
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}
