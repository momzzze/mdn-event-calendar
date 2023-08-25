import { hours } from "../../../utils/calendarUtils";

const HoursAndDays = () => {
  const days = Array.from({ length: 7 });

  return (
    <div className="flex w-116 h-96 overflow-y-auto">
    <div className="w-20 h-96">
      <div className="grid grid-rows-7">
        {hours.map((hour, index) => {
          return (
            <div
              key={index}
              className={`p-2 h-10 items-center text-left grid border-b ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}`}
            >
              <h2 className={`${index % 2 === 0 ? 'text-lg' : 'text-xs'}`}>
              {hour}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
    {/* <div className="flex-1">
      <div className="grid grid-rows-7">
        {days.map((day, index) => { 
          <div
            key={index}
            className={`p-2 h-10 items-center text-left grid border-b ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}`}
          >
          <h1>Test</h1>
          </div>
        })
      }
    </div>
    </div> */}
    </div>
  );
};

export default HoursAndDays;
