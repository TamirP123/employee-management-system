import React, { useEffect, useState } from 'react';

const Notification = ({ message, onClose, type }) => {
  const [timeLeft, setTimeLeft] = useState(5000); // 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 100;
      });
    }, 100);

    const timer = setTimeout(onClose, 5000); // Close after 5 seconds
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  const percentage = (timeLeft / 5000) * 100;

  const notificationStyle = {
    padding: '10px',
    color: type === 'error' ? 'gray' : 'green',
    backgroundColor: type === 'error' ? '#f8f9fa' : '#f8f9fa',
    border: `2px solid ${type === 'error' ? '#FF0000' : 'green'}`,
    borderRadius: '5px',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    width: '290px', // Adjust as needed
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const timerStyle = {
    height: '4px',
    width: `${percentage}%`,
    backgroundColor: type === 'error' ? '#FF0000' : 'green',
    transition: 'width 0.1s linear',
    position: 'absolute',
    bottom: 0,
    left: 0,
  };

  return (
    <div style={notificationStyle}>
      <i className="fa-solid fa-info-circle fs-1 mb-1 fs-2"></i>
      {message}
      <div style={timerStyle}></div>
    </div>
  );
};

export default Notification;
