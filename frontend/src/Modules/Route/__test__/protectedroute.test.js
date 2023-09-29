import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { loginContext } from '../../Context/UserContext';
import ProtectedRoute from '../ProtectedRoute';

const mockContextValue = {
  isAuthenticated: true, 
};

const MockComponent = () => <div>Mock Component</div>;

test('renders children when isAuthenticated is true', () => {
  const { getByText } = render(
    <MemoryRouter>
      <loginContext.Provider value={mockContextValue}>
          <ProtectedRoute>
            <MockComponent />
          </ProtectedRoute>
      </loginContext.Provider>
    </MemoryRouter>
  );

  expect(getByText('Mock Component')).toBeInTheDocument();
});

test('redirects to "/" when isAuthenticated is false', () => {
  const { container } = render(
    <MemoryRouter>
      <loginContext.Provider value={{ isAuthenticated: false }}>
          <ProtectedRoute>
            <MockComponent />
          </ProtectedRoute>
      </loginContext.Provider>
    </MemoryRouter>
  );

  expect(container.innerHTML).toBe('');
});
