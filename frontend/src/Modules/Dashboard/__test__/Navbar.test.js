import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes, BrowserRouter, useNavigate} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import Navbar from "../Components/Navbar";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock the useNavigate function
  }));


describe('Navbar', ()=>{

    test('Navbar datas',()=>{
      render(<BrowserRouter>
      <loginContext.Provider
        value={{
          user: {
           name: 'Prasanna',
              phonenumber: '9791521808',
              email: 'prasanna.tamilan2002@gmail.com',
          },
        }}
      >
          <Navbar/>
      </loginContext.Provider>
      </BrowserRouter>)  
    })
    test('Navbar renders with user data', () => {
        render(
          <MemoryRouter>
            <loginContext.Provider
              value={{
                user: {
                  name: 'Prasanna',
                  phonenumber: '9791521808',
                  email: 'prasanna.tamilan2002@gmail.com',
                },
              }}
            >
              <Navbar />
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const userNameElement = screen.getByText('Prasanna');
        expect(userNameElement).toBeInTheDocument();
      });
      
      test('Logout button triggers logout function', () => {
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);
    
        render(
          <MemoryRouter>
            <loginContext.Provider
              value={{
                user: {
                  name: 'Prasanna',
                  phonenumber: '9791521808',
                  email: 'prasanna.tamilan2002@gmail.com',
                },
              }}
            >
              <Navbar />
            </loginContext.Provider>
          </MemoryRouter>
        );
    
        const logoutButton = screen.getByTestId('logout-button');
        fireEvent.click(logoutButton);
        expect(navigateMock).toHaveBeenCalledWith('/home');
      });
})
