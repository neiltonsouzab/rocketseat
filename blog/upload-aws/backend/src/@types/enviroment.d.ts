declare namespace NodeJS {
  interface Process {
    env: {
      STORAGE_DRIVER: 'local' | 's3';
      BUCKET_NAME: string;
      MONGO_URL: string;
      APP_URL: string;
    }
  }
}