import multer from "multer";
import path from "path";
import fs from "fs";

// Function to create uploads directory if it doesn't exist
const createUploadsDir = () => {
    const uploadsDir = "../../public/uploads";
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
};

// Call createUploadsDir to ensure the directory exists
createUploadsDir();

// Define storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads")); // Uploads directory within 'public' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Unique filename
    }
});

// File filter for Multer
const fileFilter = (req, file, cb) => {
    // Accept only certain file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only JPEG and PNG files are allowed.'), false);
    }
};

// Multer upload configuration
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },
    fileFilter: fileFilter
}) // 'image' should match the name attribute in your form input

// Middleware to handle errors
export const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred (e.g., file size limit exceeded)
        next(err)
    } else if (err) {
        // An unknown error occurred
        next(err)
    }


    next(); // Make sure to call next to pass control to the next middleware
};
