declare namespace Express {
  export interface Request {
    file: {
      filename: string;
      key: string;
      name: string;
      size: number;
      destination: string;
      location: string;
      originalname: string;
      path: string;
    };
  }
}