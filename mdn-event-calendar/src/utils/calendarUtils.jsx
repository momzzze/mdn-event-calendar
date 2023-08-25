import dayjs from "dayjs";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

export const generateDateWeek = (
  day = dayjs().day(),
  week = dayjs().week(),
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfWeek = dayjs()
    .year(year)
    .month(month)
    .week(week)
    .day(day)
    .startOf("week");

  const arrayOfDate = [];

  // generate current date
  for (let i = firstDateOfWeek.date(), j = 0; j <= 6; i++, j++) {  
      arrayOfDate.push({
        date: firstDateOfWeek.date(i),
        today:
          firstDateOfWeek.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
  }
  return arrayOfDate;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["S", "M", "T", "W", "T", "F", "S"];

export const daysFullName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const hours = [
  "12am",
  "12:30am",
  "1am",
  "1:30am",
  "2am",
  "2:30am",
  "3am",
  "3:30am",
  "4am",
  "4:30am",
  "5am",
  "5:30am",
  "6am",
  "6:30am",
  "7am",
  "7:30am",
  "8am",
  "8:30am",
  "9am",
  "9:30am",
  "10am",
  "10:30am",
  "11am",
  "11:30am",
  "12PM",
  "12:30PM",
  "1PM",
  "1:30PM",
  "2PM",
  "2:30PM",
  "3PM",
  "3:30PM",
  "4PM",
  "4:30PM",
  "5PM",
  "5:30PM",
  "6PM",
  "6:30PM",
  "7PM",
  "7:30PM",
  "8PM",
  "8:30PM",
  "9PM",
  "9:30PM",
  "10PM",
  "10:30PM",
  "11PM",
  "11:30PM",
];

export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
