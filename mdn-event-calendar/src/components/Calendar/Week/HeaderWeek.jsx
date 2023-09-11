import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { months } from "../../../utils/calendarUtils";

const HeaderWeek = ({ currentDate, today, setToday, setSelectDate }) => {
  return (
    <div className="flex justify-between items-center px-1 bg-slate-100">
      <div className="flex gap-2 items-center">
        <GrFormPrevious
          className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setToday(today.day(-7));
          }}
        />
        <h1 className="select-none font-semibold">Week {today.week()}</h1>
        <GrFormNext
          className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setToday(today.day(7));
          }}
        />
        <h1 className="select-none font-semibold px-3">
          {months[today.month()]}, {today.year()}
        </h1>
      </div>
      <button
        className="bg-white cursor-pointer hover:scale-105 transition-all border-gray-200 border-2 rounded-md px-3 py-1 my-1"
        onClick={() => {
          setToday(currentDate);
          setSelectDate(currentDate);
        }}
      >
        Today
      </button>
    </div>
  );
};

export default HeaderWeek;
