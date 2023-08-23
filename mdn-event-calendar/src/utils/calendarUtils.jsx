import dayjs from "dayjs";

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
	month = dayjs().month(),
	year = dayjs().year()
) => {

	const firstDateOfWeek = dayjs().year(year).month(month).day(day).startOf("week");
	const lastDateOfWeek = dayjs().year(year).month(month).day(day).endOf("week");

	const arrayOfDate = [];

	// generate current date
	for (let i = firstDateOfWeek.date(); i <= lastDateOfWeek.date(); i++) {
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

export const daysFullName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const cn = (...classes) => {
	return classes.filter(Boolean).join(" ");
}