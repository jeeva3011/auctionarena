import logincss from '../styles/User.module.css';
import React, { useContext } from 'react';
import { Context } from './AlertContext';
const Alert = () => {
  const { alert } = useContext(Context);
  return (
    <>
      <div id='alert' className={alert.status==='success'? logincss.alertContainerGreen:logincss.alertContainerRed}>
        <p
          className={
            alert.status === 'success' ? logincss.success : logincss.error
          }
        >
          {alert.status === 'success' ? 'Success! ' : 'Error! '}
          {alert.message}
        </p>
      </div>
    </>
  );
};
export default Alert;
