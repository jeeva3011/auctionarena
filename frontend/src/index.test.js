import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AlertContext from './Modules/User/Components/AlertContext';


describe('index',()=>{
    let container;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });
    
    afterAll(() => {
      document.body.removeChild(container);
      container = null;
    });
    
    it('renders without crashing', () => {
      act(() => {
        ReactDOM.render(
          <BrowserRouter>
            <AlertContext>
              <App />
            </AlertContext>
          </BrowserRouter>,
          container
        );
      });
      expect(document.getElementById('root')).toBeDefined(); 
    });

})

