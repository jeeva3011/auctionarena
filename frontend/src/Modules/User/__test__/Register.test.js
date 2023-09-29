import React from "react";
import { render, screen, fireEvent, getByRole, act, waitFor, getByTestId } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Register from "../Components/Register";
import {MockedProvider} from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { Context as AlertContext } from "../Components/AlertContext";
import { loginContext as UserContextProvider } from "../../Context/UserContext";
import { RESEND_OTP,VERIFY_OTP } from "../../../Queries/Users/Query/GET_USERS";
import { REGISTER_USER } from "../../../Queries/Users/Mutation/REGISTER_USER";
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetLogin = jest.fn();
const mockSetToken = jest.fn()
const mockedUseNavigate = jest.fn()

const mockData=[{
  request:{
    query:VERIFY_OTP,
    variables:{
      email:'test@gmail.com',
      password:'Test@2000'
    }
  },result:{
    data:{
      verifyOtp:true
    }
  }
},{
  request:{
    query:REGISTER_USER,
    variables: {
      createUserInput: {
          name:'test',
          email:'test@gmail.com',
          phonenumber: '9791521808',
          password:'Test@2000',
          otp:'678654',
      },
    }
  },result:{
    data:{
      createUser:true
    }
  }
},{
  request:{
    query:RESEND_OTP,
    variables:{
      email:'test@gmail.com'
    }
  },result:{
    data:{
      resendOtp:true
    }
  }
}]

const errorMockDataEmail=[{
  request:{
    query:VERIFY_OTP,
    variables:{
      email:'test@gmail.com',
      password:'Test@2000'
    }
  },result:{
    data:{
      verifyOtp:false
    }
  }
},{
  request:{
    query:REGISTER_USER,
    variables: {
      createUserInput: {
          name:'test',
          email:'test@gmail.com',
          phonenumber: '9791521808',
          password:'Test@2000',
          otp:'678654',
      },
    }
  },result:{
    data:{
      createUser:true
    }
  }
},{
  request:{
    query:RESEND_OTP,
    variables:{
      email:'test@gmail.com'
    }
  },result:{
    data:{
      resendOtp:true

    }
  }
}]

const otpMockDataEmail=[{
  request:{
    query:VERIFY_OTP,
    variables:{
      email:'test@gmail.com',
      password:'Test@2000'
    }
  },result:{
    data:{
      verifyOtp:true
    }
  }
},{
  request:{
    query:REGISTER_USER,
    variables: {
      createUserInput: {
          name:'test',
          email:'test@gmail.com',
          phonenumber: '9791521808',
          password:'Test@2000',
          otp:'678654',
      },
    }
  },result:{
    data:{
      createUser:false
    }
  }
},{
  request:{
    query:RESEND_OTP,
    variables:{
      email:'test@gmail.com'
    }
  },result:{
    data:{
      resendOtp:false

    }
  }
}]

describe('Register', ()=>{
    test('RegisterLayout',async ()=>{
        render( <Router>
            <UserContextProvider.Provider value={{setUser:jest.fn()}}>
            <AlertContext.Provider value={{setAlert:jest.fn(), visible:false, setVisible:jest.fn()}}>
              <MockedProvider mocks={mockData} addTypename={false}>
                <Register setLogin={mockSetLogin}/>
              </MockedProvider>
              </AlertContext.Provider>
            </UserContextProvider.Provider>
          </Router>)

          const Name = screen.getByPlaceholderText('Name')
          const Email = screen.getByPlaceholderText('Email')
          const Mobile = screen.getByPlaceholderText('Mobile Number')
          const Password = screen.getByPlaceholderText('Password')
          const registerbutton = screen.getByTestId('registerbutton')

          expect(Name).toBeInTheDocument()
          expect(Email).toBeInTheDocument()
          expect(Mobile).toBeInTheDocument()
          expect(Password).toBeInTheDocument()
          expect(registerbutton).toBeInTheDocument()

          act(()=>{
            fireEvent.change(Name,{target:{value:'test'}})
            fireEvent.change(Email,{target:{value:'test@gmail.com'}})
            fireEvent.change(Mobile,{target:{value:'9791521808'}})
            fireEvent.change(Password,{target:{value:'Test@2000'}})
            fireEvent.click(registerbutton)
          })

          await waitFor(()=>{
            const otp = screen.getByPlaceholderText("OTP")
            const verifyotp = screen.getByTestId('verifyotp')
            const resendotp = screen.getByTestId('resendotp')
            expect(otp).toBeInTheDocument()
            expect(verifyotp).toBeInTheDocument()
            expect(resendotp).toBeInTheDocument()
            fireEvent.click(resendotp)
            waitFor(()=>{
            expect(mockSetAlert).toHaveBeenCalledWith({message:'OTP resent to mail',status:'success'})
            })
            fireEvent.change(otp,{target:{value:'678654'}})
            fireEvent.click(verifyotp)
          })
    })

    test('RegisterError',async ()=>{
      render( <Router>
          <UserContextProvider.Provider value={{setUser:jest.fn()}}>
          <AlertContext.Provider value={{setAlert:jest.fn(), visible:false, setVisible:jest.fn()}}>
            <MockedProvider mocks={errorMockDataEmail} addTypename={false}>
              <Register setLogin={mockSetLogin}/>
            </MockedProvider>
            </AlertContext.Provider>
          </UserContextProvider.Provider>
        </Router>)

        const Name = screen.getByPlaceholderText('Name')
        const Email = screen.getByPlaceholderText('Email')
        const Mobile = screen.getByPlaceholderText('Mobile Number')
        const Password = screen.getByPlaceholderText('Password')
        const registerbutton = screen.getByTestId('registerbutton')

        expect(Name).toBeInTheDocument()
        expect(Email).toBeInTheDocument()
        expect(Mobile).toBeInTheDocument()
        expect(Password).toBeInTheDocument()
        expect(registerbutton).toBeInTheDocument()

        act(()=>{
          fireEvent.change(Name,{target:{value:'test'}})
          fireEvent.change(Email,{target:{value:'test@gmail.com'}})
          fireEvent.change(Mobile,{target:{value:'9791521808'}})
          fireEvent.change(Password,{target:{value:'Test@2000'}})
          fireEvent.click(registerbutton)
        })
  })

  test('Otp Error',async ()=>{
    render( <Router>
        <UserContextProvider.Provider value={{setUser:jest.fn()}}>
        <AlertContext.Provider value={{setAlert:jest.fn(), visible:false, setVisible:jest.fn()}}>
          <MockedProvider mocks={otpMockDataEmail} addTypename={false}>
            <Register setLogin={mockSetLogin}/>
          </MockedProvider>
          </AlertContext.Provider>
        </UserContextProvider.Provider>
      </Router>)

      const Name = screen.getByPlaceholderText('Name')
      const Email = screen.getByPlaceholderText('Email')
      const Mobile = screen.getByPlaceholderText('Mobile Number')
      const Password = screen.getByPlaceholderText('Password')
      const registerbutton = screen.getByTestId('registerbutton')

      expect(Name).toBeInTheDocument()
      expect(Email).toBeInTheDocument()
      expect(Mobile).toBeInTheDocument()
      expect(Password).toBeInTheDocument()
      expect(registerbutton).toBeInTheDocument()

      act(()=>{
        fireEvent.change(Name,{target:{value:'test'}})
        fireEvent.change(Email,{target:{value:'test@gmail.com'}})
        fireEvent.change(Mobile,{target:{value:'9791521808'}})
        fireEvent.change(Password,{target:{value:'Test@2000'}})
        fireEvent.click(registerbutton)
      })

      await waitFor(()=>{
        const otp = screen.getByPlaceholderText("OTP")
        const verifyotp = screen.getByTestId('verifyotp')
        const resendotp = screen.getByTestId('resendotp')
        expect(otp).toBeInTheDocument()
        expect(verifyotp).toBeInTheDocument()
        expect(resendotp).toBeInTheDocument()
        fireEvent.change(otp,{target:{value:'678654'}})
        fireEvent.click(verifyotp)
        waitFor(()=>{
        expect(mockSetAlert).toHaveBeenCalledWith({message:'Invalid Email or OTP',status:'error'})
        })
      })
})

    test('close form', async ()=>{
      render( <Router>
        <UserContextProvider.Provider value={{setUser:jest.fn()}}>
        <AlertContext.Provider value={{setAlert:jest.fn(), visible:false, setVisible:jest.fn()}}>
          <MockedProvider mocks={mockData} addTypename={false}>
            <Register setLogin={mockSetLogin}/>
          </MockedProvider>
          </AlertContext.Provider>
        </UserContextProvider.Provider>
      </Router>)
      const close = screen.getByTestId('closebutton')

        expect(close).toBeInTheDocument()
        fireEvent.click(close)

        await waitFor(()=>{
          expect(mockSetLogin).toHaveBeenCalledWith(false)
        })
    })
})


