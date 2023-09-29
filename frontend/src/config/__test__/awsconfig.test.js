import { config } from "../aws-config";

process.env.REACT_APP_BUCKET_NAME = 'test-bucket';
process.env.REACT_APP_REGION = 'us-east-1';
process.env.REACT_APP_ACCESS = 'test-access-key';
process.env.REACT_APP_SECRET = 'test-secret-key';

describe('Configuration Object', () => {
  it('should have the correct bucketName', () => {
    expect(config.bucketName).toBe('test-bucket');
  });

  it('should have the correct region', () => {
    expect(config.region).toBe('us-east-1');
  });

  it('should have the correct accessKeyId', () => {
    expect(config.accessKeyId).toBe('test-access-key');
  });

  it('should have the correct secretAccessKey', () => {
    expect(config.secretAccessKey).toBe('test-secret-key');
  });
});
