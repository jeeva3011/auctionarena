import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AwsService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    region: process.env.AWS_S3_BUCKET_REGION,
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  });
  public async getSignerUrlForUpload(filename: string): Promise<string> {
    const params = { Bucket: this.AWS_S3_BUCKET, Key: filename, Expires: 3600 };
    return await this.s3.getSignedUrlPromise('putObject', params);
  }
  public readS3File(key) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(key),
    };
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }

  public uploadFile(file, key) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(key),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
