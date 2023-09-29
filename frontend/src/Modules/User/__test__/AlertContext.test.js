import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import AlertContext, { Context } from '../Components/AlertContext';

function TestComponent() {
  const { setAlert } = useContext(Context);

  const handleClick = () => {
    setAlert({ message: 'Alert Message', status: 'success' });
  };

  return (
    <div className="test-component" onClick={handleClick}>
      Click Me
    </div>
  );
}

describe('AlertContext', () => {
  it('initializes with default state', () => {
    const { container } = render(
      <AlertContext>
        <div>Test Component</div>
      </AlertContext>
    );

    expect(container).toHaveTextContent('Test Component');
  });

  it('updates state when setAlert is called', () => {
    const { container } = render(
      <AlertContext>
        <TestComponent />
      </AlertContext>
    );

    const testComponent = container.querySelector('.test-component');


    act(() => {
      testComponent.click();
    });
    expect(container).toHaveTextContent('Alert Message');
    expect(container).toHaveTextContent('success');
  });

  it('updates state after a timeout', async () => {
    jest.useFakeTimers(); 

    const { container } = render(
      <AlertContext>
        <TestComponent />
      </AlertContext>
    );

    const testComponent = container.querySelector('.test-component');

    act(() => {
      testComponent.click();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(container).not.toHaveTextContent('Alert Message');

    jest.useRealTimers(); 
  });
});
