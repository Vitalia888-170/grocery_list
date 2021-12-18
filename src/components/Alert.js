import React, { useEffect } from 'react';
const Alert = ({ type, message, ...props }) => {
   useEffect(() => {
      const timer = setTimeout(props.removeAlert, 3000);
      return () => clearTimeout(timer);
   }, [props.list]);
   return (
      <>
         <p className={type === 'success' ? 'success' : 'danger'}>{message}</p>
      </>
   )
}

export default Alert;
