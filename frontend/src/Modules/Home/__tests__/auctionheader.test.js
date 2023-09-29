import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Autionheader from '../Components/autionheader';

describe('Auctionheader',()=>{
    test('Auction Header', ()=>{
        render(<Autionheader></Autionheader>)
        screen.debug()
        const menubutton = screen.getByTestId('menubutton')
        expect(menubutton).toBeInTheDocument()
        act(()=>{
            fireEvent.click(menubutton)
        })

        expect(screen.getByText('Today Auctions')).toBeInTheDocument()
    })
    
})
