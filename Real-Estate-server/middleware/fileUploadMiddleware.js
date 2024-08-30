const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        let uploadFilePath = "uploaded"
        if (req.body.upload) {
            uploadFilePath = req.body.upload;
        }

        const uploadPath = path.join(__dirname, '../uploads', uploadFilePath);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, `uploads/${uploadFilePath}`); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // File name with timestamp
    },
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Middleware for handling file upload errors
const handleUpload = (req, res, next) => {
    const uploadSingle = upload.single('image');

    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ error: err.message });
        }

        // Everything went fine.
        next();
    });
};

module.exports = { handleUpload };