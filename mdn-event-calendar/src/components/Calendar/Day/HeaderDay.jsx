import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const HeaderDay = ({ currentDate, today, setToday, selectDate, setSelectDate }) => {
  return (
    <div className="flex justify-between items-center px-1 bg-slate-100">
      <div className="flex gap-2 items-center">
        <GrFormPrevious
          className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setToday(today.add(-1, "day")	);
            setSelectDate(selectDate.add(-1, "day"));
          }}
        />
        <h1 className="w-[270px] select-none font-semibold px-3">
        {selectDate.format("dddd, MMMM DD, YYYY")}
        </h1>
        <GrFormNext
          className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setToday(today.add(1, "day"));
            setSelectDate(selectDate.add(1, "day"));
          }}
        />        
      </div>
      <button
        className="bg-white cursor-pointer hover:scale-105 transition-all border-gray-200 border-2 rounded-md px-3 py-1 my-1"
        onClick={() => {
          setToday(currentDate);
          setSelectDate(currentDate);}}
      >        
        Today
      </button>
    </div>
  );
};

export default HeaderDay;
