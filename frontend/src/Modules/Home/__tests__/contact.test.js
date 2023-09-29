import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing'
import Contact from '../Components/contact';
import { Context } from '../../User/Components/AlertContext';
import { CREATE_MAIL } from '../../../Queries/Contact/Mutation/CREATE_MAIL';
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();

const mockData = [{
    request:{
        query:CREATE_MAIL,
        variables:{createEmailInput:{email:"testname@gmail.com",name:"TestName",phone:"9795432108",message:"TestName"}}
    },
    result:{
        data:{
            sendConfirmationEmail: true
        }
    }
}]

describe('Contact',()=>{
    test('Contact Rendering',()=>{
        render(
            <MockedProvider mocks={mockData} addTypename={false}>
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <Contact captcha={'ABCDE'}></Contact>
              </Context.Provider>
            </MockedProvider>
          );

        const Name = screen.getByPlaceholderText('Name')
        const Email = screen.getByPlaceholderText('Email')
        const Mobile = screen.getByPlaceholderText('Mobile No')
        const Message = screen.getByPlaceholderText('Message')
        const Captcha = screen.getByPlaceholderText('Enter Captcha')
        const emailsend = screen.getByTestId('emailsend')

        expect(Name).toBeInTheDocument()
        expect(Email).toBeInTheDocument()
        expect(Mobile).toBeInTheDocument()
        expect(Message).toBeInTheDocument()
        expect(Captcha).toBeInTheDocument()
        expect(emailsend).toBeInTheDocument()

        act(()=>{
            
            fireEvent.change(Name, {targer:{value:'TestName'}})
            fireEvent.change(Email, {targer:{value:'testname@gmail.com'}})
            fireEvent.change(Mobile, {targer:{value:'9795432108'}})
            fireEvent.change(Message, {targer:{value:'TestName'}})
            fireEvent.change(Captcha, {targer:{value:'AB'}})
            screen.debug()
            fireEvent.click(emailsend)
        })
        waitFor(()=>{
            expect(mockSetAlert).toHaveBeenCalledWith({message:'Message Delivered Successfully', status:"success"})
        })
    })
})