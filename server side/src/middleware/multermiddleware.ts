// src/middleware/multerMiddleware.ts

import multer, { StorageEngine } from "multer";
import path from "path";
import express, { Request, Response } from "express";

const app = express();
app.use("/images", express.static("images"));

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'images');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;