import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';

jest.mock('aws-sdk', () => {
  const mockGetSignedUrlPromise = jest.fn();
  const mockGetObject = jest.fn();
  const mockUpload = jest.fn();

  return {
    S3: jest.fn(() => ({
      getSignedUrlPromise: mockGetSignedUrlPromise,
      getObject: mockGetObject,
      upload: mockUpload,
    })),
  };
});

describe('AwsService', () => {
  let service: AwsService;
  let s3Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsService],
    }).compile();

    service = module.get<AwsService>(AwsService);
    s3Mock = service.s3;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a signed URL for upload', async () => {
    const filename = 'example.jpg';

    s3Mock.getSignedUrlPromise.mockResolvedValueOnce('signed-url-for-upload');

    const signedUrl = await service.getSignerUrlForUpload(filename);

    expect(signedUrl).toBe('signed-url-for-upload');
    expect(s3Mock.getSignedUrlPromise).toHaveBeenCalledWith('putObject', {
      Bucket: service.AWS_S3_BUCKET,
      Key: filename,
      Expires: 3600,
    });
  });

  it('should read an S3 file', async () => {
    const key = 'example.jpg';

    s3Mock.getObject.mockImplementation((params, callback) => {
      callback(null, { Body: 'file-content' });
    });

    const fileContent = await service.readS3File(key);

  });

  it('should upload a file to S3', async () => {
    const file = 'file-content';
    const key = 'example.jpg';
    
    s3Mock.upload.mockImplementation((params, callback) => {
      callback(null, 'upload-response');
    });

    const uploadResponse = await service.uploadFile(file, key);

  });
});
