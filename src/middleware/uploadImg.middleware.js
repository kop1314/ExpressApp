const multer = require('multer');

// const storage  = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'photos/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueprefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueprefix + '-' + file.originalname)
//     }
// })

const storage = multer.memoryStorage();

const fileFilter = (req,file, cb) => {
    if (file.mimetype.split('/')[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        files: 1
    },
});

function uploadErrorHandler(error, req, res, next) {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                message: "File limit reached!"
            })
        } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: "Must be an image!"
            })
        } else {
            return res.status(400).json({
                message: "Failed to upload image!"
            })
        }

    }
    next();
}

module.exports = {
    upload,
    uploadErrorHandler,
};