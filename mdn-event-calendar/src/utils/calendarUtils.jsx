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
"0:00",
"0:30",
"1:00",
"1:30",
"2:00",
"2:30",
"3:00",
"3:30",
"4:00",
"4:30",
"5:00",
"5:30",
"6:00",
"6:30",
"7:00",
"7:30",
"8:00",
"8:30",
"9:00",
"9:30",
"10:00",
"10:30",
"11:00",
"11:30",
"12:00",
"12:30",
"13:00",
"13:30",
"14:00",
"14:30",
"15:00",
"15:30",
"16:00",
"16:30",
"17:00",
"17:30",
"18:00",
"18:30",
"19:00",
"19:30",
"20:00",
"20:30",
"21:00",
"21:30",
"22:00",
"22:30",
"23:00",
"23:30"
  
  // "12:30 AM",
  // "1:00 AM",
  // "1:30 AM",
  // "2:00 AM",
  // "2:30 AM",
  // "3:00 AM",
  // "3:30 AM",
  // "4:00 AM",
  // "4:30 AM",
  // "5:00 AM",
  // "5:30 AM",
  // "6:00 AM",
  // "6:30 AM",
  // "7:00 AM",
  // "7:30 AM",
  // "8:00 AM",
  // "8:30 AM",
  // "9:00 AM",
  // "9:30 AM",
  // "10:00 AM",
  // "10:30 AM",
  // "11:00 AM",
  // "11:30 AM",
  // "12:00 PM",
  // "12:30 PM",
  // "1:00 PM",
  // "1:30 PM",
  // "2:00 PM",
  // "2:30 PM",
  // "3:00 PM",
  // "3:30 PM",
  // "4:00 PM",
  // "4:30 PM",
  // "5:00 PM",
  // "5:30 PM",
  // "6:00 PM",
  // "6:30 PM",
  // "7:00 PM",
  // "7:30 PM",
  // "8:00 PM",
  // "8:30 PM",
  // "9:00 PM",
  // "9:30 PM",
  // "10:00 PM",
  // "10:30 PM",
  // "11:00 PM",
  // "11:30 PM",
];

export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
