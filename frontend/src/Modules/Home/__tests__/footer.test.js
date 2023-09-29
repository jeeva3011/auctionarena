import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Footer from '../Components/footer';

describe('Footer', ()=>{
    test('footer',()=>{
        render(<Footer></Footer>)
        expect(screen.getByText('@Copyrights AuctionArena')).toBeInTheDocument()
    })
    
})