import EventsList from "./Components/eventsList";
const Events=()=>{
    const listOfEvents = ['first','second','third'];
    return(
        <div className="container mx-auto bg-indigo-500 h-screen">
            <h1>Events</h1>

            <div className='container mx-auto px-4 m-20 bg-[#50d71e]'>
                <h2>This is the list of events!</h2>

            </div>

        </div>
    )
}

export default Events;