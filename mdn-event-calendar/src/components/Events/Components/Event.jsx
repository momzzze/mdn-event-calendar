import React from 'react';

const event = ({ events }) => {
  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>startDate: {event.startDate}</p>
            <p>endDate: {event.endDate}</p>
            <p>participants: {event.participants}</p>
            <p>reoccurrence: {event.reoccurrence}</p>
            <p>publicity: {event.publicity}</p>
            <p>location: {event.location}</p>
            <p>description: {event.description}</p>
            <p>weather: {event.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventComponent;
