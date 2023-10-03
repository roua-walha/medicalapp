import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calandar.css';

const Calandar = ({ authorized, setSelectedDateTime }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setselectedDateTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // réinitialiser l'heure sélectionnée lorsque la date est modifiée
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const selectedDateTime = selectedDate.toLocaleDateString() + ' at ' + time;
    setDateTime(selectedDateTime);
    setSelectedDateTime(selectedDateTime);
  };

  const availableTimes = [
    '8h:30',
    '9h:00',
    '9h:30',
    '10h:00',
    '10h:30',
    '11h:00',
    '11h:30',
    '12h:00',
    '12h:30',
    '13h:00',
    '13h:30',
    '14h:00',
    '14h:30',
  ];

  return (
    <div className="appointment-scheduler">
      
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Calendar value={selectedDate} onChange={handleDateChange} minDate={new Date()}
        
        tileDisabled={({ date, view }) => {
          // Disable all Sundays and dates before today
          if (date.getDay() === 0 || date < new Date()) {
            return true;
          }
          return false;
        }}  />
        <div style={{ marginTop: '1rem' }}>
          {availableTimes.map((time) => (
            <button
             id='heure'
              key={time}
              disabled={!selectedDate} // désactiver les boutons d'heure si aucune date n'est sélectionnée
              style={{
                
                margin: '0.3rem',
                padding: '0.5rem 1rem',
                backgroundColor: selectedTime === time ? 'linear-gradient(135deg, #71b7e6, #9b59b6)' : '#ee50a9', // mettre en évidence l'heure sélectionnée
              }}
              onClick={(event) => {
                event.preventDefault(); // prevent form submission
                handleTimeClick(time);
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      {selectedTime && (
        <h5 id='h5arec'>
          You have selected the appointment for the {dateTime}.
        </h5>
      )}
    </div>
  );
};

export default Calandar;