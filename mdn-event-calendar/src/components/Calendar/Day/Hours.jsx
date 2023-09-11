import { hours } from "../../../utils/calendarUtils";

const Hours = () => {
    return (
      <>
        {hours.map((hour, index) => (
          <div
            key={index}
            className="bg-slate-50 h-[1.625rem] flex items-center justify-center border-2 border-gray-200"
          >
            {hour}
          </div>
        ))}
      </>
    );
  };

export default Hours;