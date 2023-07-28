import '../../src/App.css'
import React, { useState, useEffect } from 'react';

const Alert = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div className={`alert-pop ${isVisible ? 'visible' : ''}`}>
      <div className="alert-pop-content">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
