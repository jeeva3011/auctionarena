import React from "react";
import { render, screen, fireEvent, getByRole, act, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import ForgotPassword from "../Components/ForgotPassword";
import { MockedProvider } from "@apollo/client/testing";
import '@testing-library/jest-dom'
import { Context as AlertContext } from "../Components/AlertContext";
import { loginContext as UserContextProvider } from "../../Context/UserContext";
import { gql } from "@apollo/client";
import { CHANGE_USER_PASSWORD,VERIFY_EMAIL,FORGOT_PASSWORD_OTP } from "../../../Queries/Users/Mutation/CHANGE_USER_PASSWORD";

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate, 
}))

const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetLogin = jest.fn();
const mockSetToken = jest.fn()
const mockSetUser = jest.fn()


const mockForgotPassword = [{
  request:{
    query:CHANGE_USER_PASSWORD,
    variables:{
      updateUser:{
        email: 'prasanna1test@gmail.com',
        password:'Prasanna#2002',
        otp:'0123'
      }
    }
  },
  result:{
    data:{
      "updateUser": true,
    }
  },
}]

const mockVerifyEmail=[{
  request:{
    query:VERIFY_EMAIL,
    variables:{
      email:"prasanna1test@gmail.com",
    }
  },
  result:{
    data:{
      "verifyEmail": true
    }
  },
}]

const mockgetotp=[{
  request: {
    query: FORGOT_PASSWORD_OTP,
    variables: {
      email: "prasanna1test@gmail.com",
    },
  },
  result: {
    data:  {
      "forgotOtpRequest": false
    }
  },
}]



describe("ForgotPassword", () => {
  test("renders the form with email input", async () => {
    console.log('GraphQL Query:', mockgetotp[0].request.query);
   render(
      <Router>
        <UserContextProvider.Provider value={{setUser:mockSetUser}}>
          <AlertContext.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
            <MockedProvider mocks={mockVerifyEmail}>
              <ForgotPassword  setLogin={[mockSetLogin,mockForgotPassword]}/>
            </MockedProvider>
          </AlertContext.Provider>
        </UserContextProvider.Provider>
      </Router>
    );
    // jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    const emailInput = screen.getByPlaceholderText('Email');
    const otpInput = screen.getByPlaceholderText('Enter Otp');
    const getOtpButton = document.querySelector('.formLink')
    const submit = screen.getByText('Submit');
    
    expect(emailInput).toBeInTheDocument()
    expect(otpInput).toBeInTheDocument()
    expect(submit).toBeInTheDocument()

    act(()=>{
      fireEvent.change(emailInput, {target:{value:'prasanna.tamilan2002@gmail.com'}})
      getOtpButton.click()
    })  
    await waitFor(()=>{
      // screen.getByPlaceholderText('Retype password');
      expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Invalid mail', status: 'error' })
      expect(mockSetVisible).toHaveBeenCalledWith(true)
    })
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
  });

  


  test('close form',async ()=>{
    render(
      <Router>
      <UserContextProvider.Provider value={{setUser:mockSetUser}}>
        <AlertContext.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
          <MockedProvider mocks={mockgetotp}>
            <ForgotPassword setLogin={mockSetLogin}/>
          </MockedProvider>
        </AlertContext.Provider>
      </UserContextProvider.Provider>
    </Router>
  );


  const close = screen.getByTestId('close-button')

        expect(close).toBeInTheDocument()
        fireEvent.click(close)

        await waitFor(()=>{
          expect(mockSetLogin).toHaveBeenCalledWith(false)
        })
  })
});
