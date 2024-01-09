import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileName = file.originalname;
    const folderName = fileName.split('_')[0];

    const folderPath = path.join('./Videos', folderName);
    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;