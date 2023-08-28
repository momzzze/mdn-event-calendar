const dummyEvents = [{
        title: "Sample Event 1",
        startDate: "2023-08-25T10:00",
        endDate: "2023-08-25T11:30",
        participants: "John Doe, Jane Smith",
        reoccurrence: "Weekly",
        publicity: "public",
        location: "Conference Room",
        description: "This is a sample event.",
        weather: "Sunny",
    },
    {
        title: "Sample Event 2",
        startDate: "2023-08-26T15:00",
        endDate: "2023-08-26T16:30",
        participants: "Alice Johnson, Bob Brown",
        reoccurrence: "Monthly",
        publicity: "private",
        location: "Online",
        description: "Another sample event.",
        weather: "Cloudy",
    },
    {
        title: "Team Meeting",
        startDate: "2023-08-27T09:30",
        endDate: "2023-08-27T11:00",
        participants: "Team Members",
        reoccurrence: "Weekly",
        publicity: "private",
        location: "Meeting Room",
        description: "Weekly team meeting.",
        weather: "Partly Cloudy",
    },
    {
        title: "Birthday Party",
        startDate: "2023-09-05T18:00",
        endDate: "2023-09-05T22:00",
        participants: "Friends and Family",
        reoccurrence: "None",
        publicity: "public",
        location: "Backyard",
        description: "Birthday celebration.",
        weather: "Clear",
    },
];
const EventsList = () => {
    return ( <
        h1 > This is the event list! < /h1>
    )
}
export default EventsList