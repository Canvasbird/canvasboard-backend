const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const {Users, Folders} = require('../../models/db')

exports.createFolder = async (req, res) => {
    try {

        const folder = await new Folders({
            folder_name:req.body.folder_name,
            folder_title:req.body.folder_title,
            is_nested_folder:req.body.is_nested_folder
        })

        try {

            const { _id } = await folder.save()  
            const user = await Users.findById(req.body.user_id)
            const message = await user.addFolder(_id);
            res.status(200).json(httpStatus200(folder, message))

        } catch (error) {
            console.log(error)
            if(error) res.status(500).json(httpStatus500(error))
        }

    } catch (error) {
        
        console.log(error)
        if(error) res.status(500).json(httpStatus500(error))
    }

}