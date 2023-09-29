import { Test, TestingModule } from '@nestjs/testing';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import {createEmailInput} from './test/utils'
import { otpgen } from './test/utils';
describe('EmailResolver', () => {
  let resolver: EmailResolver;
  const emailServiceMock = {
    sendConfirmationEmail: jest.fn(),
    sendOTPEmail: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailResolver, {
        provide: EmailService,
        useValue:emailServiceMock
      }],
    }).compile();

    resolver = module.get<EmailResolver>(EmailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('sendConfirmationEmail', () => {
    it('should send a confirmation email and return true', async () => {
    
      const result = await resolver.sendConfirmationEmail(createEmailInput);

      expect(emailServiceMock.sendConfirmationEmail).toHaveBeenCalledWith(createEmailInput);
      expect(result).toBe(true);
    });

    it('should handle errors and return false', async () => {
     
      emailServiceMock.sendConfirmationEmail.mockRejectedValue(new Error('Email sending error'));
      const result = await resolver.sendConfirmationEmail(createEmailInput);

      expect(emailServiceMock.sendConfirmationEmail).toHaveBeenCalledWith(createEmailInput);
      expect(result).toBe(false);
    });
  });

  describe('sendOTPEmail', () => {
    it('should send an OTP email and return true', async () => {
      const result = await resolver.sendOTPEmail(otpgen);

      expect(emailServiceMock.sendOTPEmail).toHaveBeenCalledWith(otpgen);
      expect(result).toBe(true);
    });

    it('should handle errors and return false', async () => {
    

      emailServiceMock.sendOTPEmail.mockRejectedValue(new Error('OTP email sending error'));

      const result = await resolver.sendOTPEmail(otpgen);

      expect(emailServiceMock.sendOTPEmail).toHaveBeenCalledWith(otpgen);
      expect(result).toBe(false);
    });
  });
});
