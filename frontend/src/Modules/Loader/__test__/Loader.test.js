import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../Components/Loader';

describe('<Loader>',()=>{
    test('should render the Loader component', () => {
        const { container } = render(<Loader />);
        
        expect(container.querySelector('#page')).toBeInTheDocument();
        expect(container.querySelector('#container')).toBeInTheDocument();
        expect(container.querySelectorAll('#ring')).toHaveLength(4);
        expect(container.querySelector('#h3')).toBeInTheDocument();
      });
})

