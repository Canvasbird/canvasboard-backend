const { httpStatus200, httpStatus500} = require('../../status/httpStatus')
const {Folders} = require('../../models/db')

// * CREATE CHILD FOLDER 
exports.createChildFolder = async (req, res) => {
    try {
        const childFolder = await new Folders({
            folder_name:req.body.folder_name,
            folder_title:req.body.folder_title,
            is_nested_folder:req.body.is_nested_folder
        })
        try {
            const {_id} = await childFolder.save()
            try {
                const rootFolder = await Folders.findById(req.body.folder_id)
                try {
                    await rootFolder.addChildFolder(_id);
                    res.status(200).json(httpStatus200("Folder Created!"))
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