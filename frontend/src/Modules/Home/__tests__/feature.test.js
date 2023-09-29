import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing'
import { Context } from '../../User/Components/AlertContext';
import Feature from '../Components/feature'
import { GET_ALL_FEATURES } from '../../../Queries/Features/Query/GET_ALL_FEATURES';
import Contact from '../Components/contact';

const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const noMockedData = [{
    request:{
        query:GET_ALL_FEATURES,
    },
    result:{
        loading:true
    }
}]
const mockData = [{
    request:{
        query:GET_ALL_FEATURES,
    },
    result:{
        data:{  
            getAllFeatures:[{
                id: 1,
                name: "Player Registration",
                description: "Player can register own self from mobile app"
              },
              {
                id: 2,
                name: "Live Streaming",
                description: "We Provide Live Streaming Overlay for Youtube, Facebook"
              },
              {
                id: 3,
                name: "Team Owner View",
                description: "All team owner can live view points, player profile on there mobiles"
              },
              {
                id: 4,
                name: "Remotely Bid",
                description: "We provide remotely bidding system in this application for team owner take bid from their mobile or laptop"
              }
          ]
        }
    }
}]
describe('Feature',()=>{
    test('Feature',()=>{
        render(<MockedProvider mocks={mockData} addTypename={false}><Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
            <Feature></Feature>
        </Context.Provider></MockedProvider>)
        screen.debug()
        waitFor(()=>{
            expect(screen.getByTestId('feature1')).toBeInTheDocument()
            expect(screen.getByTestId('feature2')).toBeInTheDocument()
            expect(screen.getByTestId('feature3')).toBeInTheDocument()
            expect(screen.getByTestId('feature4')).toBeInTheDocument()

        })
        
    })
    test('No Data Feature',()=>{
        render(<MockedProvider mocks={noMockedData} addTypename={false}><Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
            <Feature></Feature>
        </Context.Provider></MockedProvider>)
        waitFor(()=>{
            expect(screen.getByTestId('feature1')).toBeInTheDocument()
            expect(screen.getByTestId('feature2')).toBeInTheDocument()
            expect(screen.getByTestId('feature3')).toBeInTheDocument()
            expect(screen.getByTestId('feature4')).toBeInTheDocument()

        })
    })

    
    
})