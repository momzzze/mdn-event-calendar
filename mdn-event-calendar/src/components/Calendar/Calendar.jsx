import { useState } from "react";
import dayjs from "dayjs";
import { calendarViews } from "../../common/enums/calendar.enums";
import ViewControl from "./ViewControl";
import MonthCalendar from "./Month/MonthCalendar";
import WeekCalendar from "./Week/WeekCalendar";
import EventList from "./EventList";
import Hours from "./Week/HoursAndDays";
import NewEvent from "../Events/NewEvent/NewEvent";

const Calendar = () => {
  const [view, setView] = useState(calendarViews.MONTH.view);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [isOpenNewEventModal, setOpenNewEventModal] = useState(false);

  const openNewEventModal = () => {
    setOpenNewEventModal(true);
  }
  const closeNewEventModal = () => {
    setOpenNewEventModal(false);
  }

  return (
    <>
      <div className="flex justify-between px-3 py-2">
        <div className="flex-1 border-radius">
          <div className="flex justify-between px-2 pb-2">
            <button
              onClick={openNewEventModal}
              className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
              New Event
            </button>
            <NewEvent
              isOpen={isOpenNewEventModal}
              onRequestClose={closeNewEventModal}
            />
            <ViewControl view={view} setView={setView} />
          </div>
          <div className="border rounded">
            {view === calendarViews.MONTH.view && (
              <MonthCalendar
                currentDate={currentDate}
                today={today}
                setToday={setToday}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
              />
            )}
            {view === calendarViews.WEEK.view && (
              <WeekCalendar
                currentDate={currentDate}
                today={today}
                setToday={setToday}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
              />
            )}
          </div>
        </div>
        <EventList selectDate={selectDate} />
      </div>
    </>
  );
};

export default Calendar;
