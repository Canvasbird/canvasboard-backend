const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const {Users, Folders} = require('../../models/db')

// * CREATE FOLDER
exports.createFolder = async (req, res) => {
    try {
        const folder = await new Folders({
            folder_name:req.body.folder_name,
            folder_title:req.body.folder_title,
            is_nested_folder:req.body.is_nested_folder
        })
        try {
            const { _id } = await folder.save()  
            try {
                const user = await Users.findById(req.body.user_id)
                try {
                    const result = await user.addFolder(_id);
                    res.status(200).json(httpStatus200(result))
                } catch (error) {
                   if(error) res.status(500).json(httpStatus500(error))
                }
            } catch (error) {
               if(error) res.status(500).json(httpStatus500(error))
            }
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}