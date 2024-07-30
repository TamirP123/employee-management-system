import React, { useState, useEffect } from 'react';
import '../styles/calendar.css';


const WeeklyCalendar = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const currentDayIndex = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayIndex);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const formatTime = (date) => {
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const isAm = hours < 12;
  //   const formattedHours = hours % 12 || 12;
  //   const formattedMinutes = minutes.toString().padStart(2, '0');
  //   const amPm = isAm ? 'AM' : 'PM';
  //   return `${formattedHours}:${formattedMinutes} ${amPm}`;
  // };

  // const formatDate = (date) => {
  //   const options = { weekday: 'long', month: 'long', day: 'numeric' };
  //   return date.toLocaleDateString('en-US', options);
  // };

  return (
    <div className="weekly-calendar container">
      <div className="row">
        {weekDays.map((date, index) => (
          <div
            key={index}
            className={`day col ${index === currentDayIndex ? 'today' : ''}`}
          >
            <div className="day-name">{daysOfWeek[date.getDay()]}</div>
            <div className="day-number">{date.getDate()}</div>
          </div>
        ))}
      {/* <div className="row mt-3 justify-content-start">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <p className="time-text">
                <span>{formatTime(currentTime).split(' ')[0]}</span>
                <span className="time-sub-text">{formatTime(currentTime).split(' ')[1]}</span>
              </p>
              <p className="day-text">{formatDate(currentTime)}</p>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
