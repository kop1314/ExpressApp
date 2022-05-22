const multer = require('multer');
const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body);
        console.log("hello from multer");
        cb(null, 'photos/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage
});

module.exports = {
    upload,
};