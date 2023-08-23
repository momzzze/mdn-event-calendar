

const EventList = () => {
  return (
    <div className="h-96 w-96 sm:px-5">
      <h1 className=" font-semibold">
        Schedule
        {/* Schedule for {selectDate.toDate().toDateString()} */}
      </h1>
      <p className="text-gray-400">No meetings for today.</p>
      <div className="event-list">
        {/* {events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))} */}
      </div>
    </div>
  );
};

export default EventList;