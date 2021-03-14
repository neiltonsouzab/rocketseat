import { Schema, Document, model } from 'mongoose';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const s3 = new aws.S3();

interface Post {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: Date;
}

export interface PostModel extends Post, Document {

}

const PostSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})



PostSchema.pre<PostModel>('save', function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre<PostModel>('remove', function(): Promise<void> {
  if (process.env.STORAGE_DRIVER === 's3') {
    return s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: this.key
    })
    .promise()
    .then(response => console.log(response))
    .catch(response => console.log(response))

  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
    )
  }
})

export default model('Post', PostSchema);