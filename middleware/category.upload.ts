import multer from "multer";
import Path from "path";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./uploads/categories");
  },

  filename: (req: Request, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
): void => {
  const acceptableExt = [".png", ".jpg", ".jpeg"];
  if (!acceptableExt.includes(Path.extname(file.originalname))) {
    return callback(
      new Error("Only .png, .jpg and .jpeg format allowed!"),
      false
    );
  }
  const fileSize: number = parseInt(req.headers["content-length"] as string);

  if (fileSize > 1048576) {
    return callback(new Error("File Size Big"), false);
  }

  callback(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1048567,
  },
});

export default upload.single("category_image");
