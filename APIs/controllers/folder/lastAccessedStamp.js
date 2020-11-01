const {Folders} = require('../../models/db')
const { httpStatus200, httpStatus500} = require('../../status/httpStatus')

exports.lastAccessedModified = async (req, res) => {
    if(!req.body.is_modified) {
        try {
            await Folders.findByIdAndUpdate(req.body.folder_id, {$set:{last_accessed_on:Date.now()}})
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
    else {
        try {
            await Folders.findByIdAndUpdate(req.body.folder_id, {$set:{last_accessed_on:Date.now() , last_modified_on:Date.now()}})
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
}