import { gql } from "@apollo/client";

export const CREATE_OTP = gql`
  mutation($otpgen: OTPgen!) {
    sendOTPEmail(otpgen: $otpgen)
  }
`;