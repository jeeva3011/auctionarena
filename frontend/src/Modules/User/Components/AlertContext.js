import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const AlertContext = (props) => {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ message: '', status: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  return (
    <Context.Provider value={{ alert, setAlert, visible, setVisible }}>
      {props.children}
    </Context.Provider>
  );
};

export default AlertContext;
