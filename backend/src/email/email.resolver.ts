import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';
import { CreateEmailInput } from './dto/create-email.input';
import { OTPgen } from './dto/OTPgen.inpupt.';

@Resolver(() => Email)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  async sendConfirmationEmail(
    @Args('createEmailInput') createEmailInput: CreateEmailInput,
  ): Promise<boolean> {
    try {
      await this.emailService.sendConfirmationEmail(createEmailInput);
      return true;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async sendOTPEmail(
    @Args('otpgen') otpgen: OTPgen,
  ): Promise<boolean> {
    try {
      await this.emailService.sendOTPEmail(otpgen);
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }
}
