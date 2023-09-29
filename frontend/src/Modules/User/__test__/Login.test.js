import React from "react";
import { render, screen, fireEvent, getByRole, act, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import {MockedProvider} from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { Context as AlertContext } from "../Components/AlertContext";
import { loginContext as UserContextProvider } from "../../Context/UserContext";

import { GetAccessToken } from "../../../Queries/JWT/Authorization";
import { LOGIN_USER } from "../../../Queries/Users/Query/GET_USERS";

const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetLogin = jest.fn();
const mockSetToken = jest.fn()
const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate, 
}))

const AccesTokenMocks = [
  {
    request: {
      query: GetAccessToken, 
      variables: {
        email: "test@gmail.com", 
        password: "Test@2000",
      },
    },
    result: {
      data: {
        performLogin: {
          AccessToken: "oihgcvbnm,vcdrtyuknbvcxzcvbnm,.;poiuyf",
          RefereshToken: "[poiuyfcvbnm,./kjuhbvcxdfvbjhnmkjhfdwqwerty98765rfhukmnbvde4rfvbnjiokn vfew2wdvbji90ojn m.'[;.,hgftyh",
        },
      },
    },
  },
];

const mockUserDetails = [
  {
    request: {
      query: LOGIN_USER,
      variables: {loginuser:{
        email: "test@gmail.com",
        password: "Test@2000",}
      },
    },
    result: {
      data: {
        LoginUser: {
          userid: 57,
          name: "test",
          email: "test@gmail.com",
          phonenumber: "9792345678",
          password: "Test@2000",
          auction: []
        }
      }
    },
  },
]

  

describe('Login',()=>{
    test("renders login layout", async () => {
       render( <Router>
        <UserContextProvider.Provider value={{setUser:jest.fn()}}>
        <AlertContext.Provider value={{setAlert:jest.fn(), visible:false, setVisible:jest.fn()}}>
          <MockedProvider mocks={[...AccesTokenMocks,...mockUserDetails]} addTypename={false}>
            <Login setLogin={mockSetLogin}/>
          </MockedProvider>
          </AlertContext.Provider>
        </UserContextProvider.Provider>
      </Router>);
      // const text = screen.getByText('Login')
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText('Password');
        const captchaInput = screen.getByPlaceholderText("Enter Answer");
        document.getElementById('captcha')
        const loginButton = screen.getByRole("button", { name: "Login" })
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(captchaInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
      });

      test('Login getAccessToken working', async ()=>{
        const captchaValue = 'ABCDE'
        const formData = {
          email: "test@gmail.com",
          password: "Test@2000",
        }
        render( <Router>
          <UserContextProvider.Provider value={{setUser:jest.fn()}}>
          <AlertContext.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
            <MockedProvider mocks={[...AccesTokenMocks,...mockUserDetails]} addTypename={false}>
              <Login setToken={mockSetToken} setLogin={mockSetLogin} captcha={'ABCDE'}/>
            </MockedProvider>
            </AlertContext.Provider>
          </UserContextProvider.Provider>
        </Router>);

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText('Password');
        const captchaInput = screen.getByPlaceholderText("Enter Answer");
        const loginButton = screen.getByRole("button", { name: "Login" })
        
        act(()=>{
          fireEvent.change(emailInput, {target:{value:'test@gmail.com'}})
          fireEvent.change(passwordInput, {target:{value:'Test@2000'}})
          fireEvent.change(captchaInput,{target:{value:captchaValue}})
          fireEvent.click(loginButton)
        })
        await waitFor(async () => {
          // expect(mockSetToken).toHaveBeenCalledTimes(1)
          // // screen.debug()
          expect(mockSetAlert).toHaveBeenCalledTimes(1)
          // // With({ message: 'login Successful', status: 'success' });
          // expect(mockSetVisible).toHaveBeenCalledWith(true);
          // expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
        })

      })

      test('close form', async ()=>{

        const captchaValue = 'ABCDE'
        render( <Router>
          <UserContextProvider.Provider value={{setUser:jest.fn()}}>
          <AlertContext.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
            <MockedProvider mocks={[...AccesTokenMocks,...mockUserDetails]} addTypename={false}>
              <Login setLogin={mockSetLogin} captcha={'ABCDE'}/>
            </MockedProvider>
            </AlertContext.Provider>
          </UserContextProvider.Provider>
        </Router>);

        const close = screen.getByTestId('closebutton')

        expect(close).toBeInTheDocument()
        fireEvent.click(close)

        await waitFor(()=>{
          expect(mockSetLogin).toHaveBeenCalledWith(false)
        })

      })


})

