import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
import { CreateEmailInput } from './dto/create-email.input';
import { OTPgen } from './dto/OTPgen.inpupt.';


@Injectable()
export class EmailService {
  async sendConfirmationEmail(createEmailInput:CreateEmailInput) {
    const config = {
      service: 'gmail',
      auth: {
        user: 'auctionarenaweb@gmail.com',
        pass: 'tdizqbzcjsrodiyz',
      },
    };

    const transporter = nodemailer.createTransport(config);

    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'AuctionArena',
        link: 'http://localhost:3000',
      },
    });

    const emailDesign = {
      body: {
        name: `You Received a Response From ${createEmailInput.name}`,
        table: {
          data: [
            {
              email:createEmailInput.email,
              phone: createEmailInput.phone,
              message:createEmailInput.message,
            },
          ],
        },
      },
    };

    const mail = mailGenerator.generate(emailDesign);

    const emailMessage = {
      from: 'auctionarenaweb@gmail.com',
      to: 'auctionarenaweb@gmail.com',
      subject: 'Confirmation',
      text: 'Successfully Registered with us.',
      html: mail,
    };

    await transporter.sendMail(emailMessage);
    return true;
  }

  async sendOTPEmail(otpgen:OTPgen) {
    const config = {
      service: 'gmail',
      auth: {
        user: 'auctionarenaweb@gmail.com',
        pass: 'tdizqbzcjsrodiyz',
      },
    };

    const transporter = nodemailer.createTransport(config);

    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'AuctionArena',
        link: 'http://localhost:3000',
      },
    });

    const emailDesign = {
      body: {
        name: 'You Received an OTP From AuctionArena',
        table: {
          data: [
            {
              email: 'auctionarenaweb@gmail.com',
              message:otpgen.message,
            },
          ],
        },
      },
    };

    const mail = mailGenerator.generate(emailDesign);
    console.log(otpgen.email)
    const emailMessage = {
      from: 'auctionarenaweb@gmail.com',
      to: otpgen.email,
      subject: 'OTP Verification',
      text: 'Successfully Registered with us.',
      html: mail,
    };

    await transporter.sendMail(emailMessage);
    return true;
  }
}
