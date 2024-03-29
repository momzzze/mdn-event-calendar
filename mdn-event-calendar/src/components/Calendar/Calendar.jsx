import { useState } from "react";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { calendarViews } from "../../common/enums/calendar.enums";
import ViewControl from "./ViewControl";
import MonthCalendar from "./Month/MonthCalendar";
import WeekCalendar from "./Week/WeekCalendar";
import DayCalendar from "./Day/DayCalendar";
import ScheduleList from "./Schedule/ScheduleList";
import NewEvent from "../Events/NewEvent/NewEvent";
import { useData } from "../../contexts/DataContext";

const Calendar = () => {
  const [view, setView] = useState(calendarViews.MONTH.view);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [isOpenNewEventModal, setOpenNewEventModal] = useState(false);
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();
  if (!publicEventsCurrentUserParticipate || !privateEvents) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 border-opacity-50"></div>
      </div>
    );
  }
  const openNewEventModal = () => {
    setOpenNewEventModal(true);
  };
  const closeNewEventModal = () => {
    setOpenNewEventModal(false);
  };
  const allEvents = [
    ...publicEventsCurrentUserParticipate,
    ...privateEvents,
  ]?.filter(
    (event) =>
      (dayjs(event?.startDate).isSame(event?.endDate, "day") &&
        dayjs(event?.startDate).isSame(selectDate, "day")) ||
      dayjs(selectDate).isBetween(
        dayjs(event?.startDate).add(-1, "day"),
        dayjs(event?.endDate).add(1, "day"),
        "day"
      )
  )?.sort((a, b) => dayjs(a?.startDate).hour() - dayjs(b?.startDate).hour());

  return (
    <div className="calendar-container mb-16">
      <div className="flex h-4/5 gap-1 justify-between px-3 py-2 text-gray-700">
        <div className="flex-1 border-radius">
          <div className="flex justify-between px-2 pb-2">
            <button
              onClick={openNewEventModal}
              className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            >
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
                allEvents={allEvents}

              />
            )}
            {view === calendarViews.DAY.view && (
              <DayCalendar
                currentDate={currentDate}
                today={today}
                setToday={setToday}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                allEvents={allEvents}
              />
            )}
          </div>
        </div>
        <ScheduleList
          selectDate={selectDate}
          allEvents={allEvents}
        />
      </div>
    </div>
  );
};

export default Calendar;
