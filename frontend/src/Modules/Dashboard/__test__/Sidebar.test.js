import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes, BrowserRouter, useNavigate} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import Sidebar from "../Components/Sidebar";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock the useNavigate function
  }));


  describe('Sidebar', ()=>{
    test('sidebar layout',()=>{
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
                <Sidebar></Sidebar>
            </loginContext.Provider>
            </BrowserRouter>)

            const menu = screen.getByTestId('menu')

            expect(menu).toBeInTheDocument()
            fireEvent.click(menu)
            fireEvent.click(menu)


    })
  })

