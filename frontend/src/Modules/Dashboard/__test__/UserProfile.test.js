import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes, BrowserRouter, useNavigate} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import UserProfile from "../Components/UserProfile";


const mockClose = jest.fn()

describe('UserProfileDisplay', ()=>{
    test("render email & name", ()=>{
        render(<UserProfile email={'test@gmail.com'} name={'test'} close={mockClose}></UserProfile>)

        expect(screen.getByText('Email: test@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('test')).toBeInTheDocument()
        const closebutton = screen.getByTestId('closebutton')
        fireEvent.click(closebutton)
    })

})