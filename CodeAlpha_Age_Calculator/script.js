function getDaysInMonth(month, year) {
	const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
	let feb;
	if (isLeapYear) {
		feb = 29;
	} else {
		feb = 28;
	}
	const daysInMonths = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return daysInMonths[month - 1];
}

function calculateAge() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const currentDate = today.getDate();

	const dob = new Date(document.getElementById("dob").value);

	const inputData = {
		date: dob.getDate(),
		month: dob.getMonth() + 1,
		year: dob.getFullYear(),
	};

	if (
		inputData.year > currentYear ||
		(inputData.year === currentYear && inputData.month > currentMonth) ||
		(inputData.year === currentYear &&
			inputData.month === currentMonth &&
			inputData.date > currentDate)
	) {
		document.getElementById("age").innerHTML = "Invalid Input";
		return;
	}

	let years = currentYear - inputData.year;
	let months, days;

	if (
		currentMonth < inputData.month ||
		(currentMonth === inputData.month && currentDate < inputData.date)
	) {
		years--;
		months = 12 - (inputData.month - currentMonth);
	} else {
		months = currentMonth - inputData.month;
	}

	if (currentDate < inputData.date) {
		months--;
		const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

		const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
		days = daysInLastMonth - (inputData.date - currentDate);
	} else {
		days = currentDate - inputData.date;
	}
	return { years, months, days };
}

function Display(data) {
	const box = document.getElementById("age");
	if(data.months === NaN || data.years === NaN || data.daya === NaN){
		box.innerHTML = "Kindly Enter your Birth Date";
	}
	else if (data.months == 0) {
		box.innerHTML = `You are ${data.years} years, and ${data.days} days old.`;
	} else if (data.days == 0) {
		box.innerHTML = `You are ${data.years} years, and ${data.months} months old.`;
	} else {
		box.innerHTML = `You are ${data.years} years, ${data.months} months and ${data.days} days old.`;
	}
};

document.getElementById("calculate").addEventListener("click", () => {
	const data = calculateAge();
	Display(data);
});
