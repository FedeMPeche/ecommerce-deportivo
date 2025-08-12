declare namespace Express {
  export interface Request {
    file?: Multer.File;
    files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
  }
}

declare namespace Multer {
  export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
  }
}

