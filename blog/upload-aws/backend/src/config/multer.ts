import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

interface MulterConfig {
  dest: string;
  storage: StorageEngine | undefined,
  limits: {
    fileSize: number;
  },
  fileFilter(): void;
}

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(10).toString('hex');
      const filename = `${hash}-${file.originalname}`;


      return cb(null, filename);
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: String(process.env.BUCKET_NAME),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const hash = crypto.randomBytes(10).toString('hex');
      const key = `${hash}-${file.originalname}`;


      return cb(null, key);
    },
  }),
};


export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_DRIVER],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
} as MulterConfig;