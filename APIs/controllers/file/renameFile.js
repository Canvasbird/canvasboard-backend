const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
// const minio = require("../../config/minio");

exports.renameFileAttributes = async (req, res) => {
  if (req.body.is_modified) {
    try {
<<<<<<< HEAD
      const changedContent = await Files.findByIdAndUpdate(req.body.file_id, {
=======
      await Files.findByIdAndUpdate(req.body.file_id, {
>>>>>>> f01c19f16df7518d668f46e5460dd5a538c59bd7
        $set: {
          file_name: req.body.file_name,
          file_tag: req.body.file_tag,
          last_accessed_on: Date.now(),
          last_modified_on: Date.now(),
          // file_url:req.file.originalname
        },
      });
      //   await minio.minioClient.putObject(
      //     "files",
      //     req.file.originalname,
      //     req.file.buffer
      //   );
<<<<<<< HEAD

      if (changedContent !== null) {
        res.status(200).json(httpStatus200(null, "File Renamed"));
      } else {
        res.status(500).json(httpStatus500("Invalid File Id"));
      }
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  } else {
    try {
      const changedContent = await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          file_name: req.body.file_name,
          file_tag: req.body.file_tag,
          last_accessed_on: Date.now(),
        },
      });
      if (changedContent !== null) {
        res.status(200).json(httpStatus200(null, "File Renamed"));
      } else {
        res.status(500).json(httpStatus500("Invalid File Id"));
      }
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
=======
      res.status(200).json(httpStatus200(null, "File Renamed"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  } else {
    try {
      await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          file_name: req.body.file_name,
          file_tag: req.body.file_tag,
          last_accessed_on: Date.now(),
        },
      });
      res.status(200).json(httpStatus200(null, "File Renamed"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
>>>>>>> f01c19f16df7518d668f46e5460dd5a538c59bd7
  }
};
