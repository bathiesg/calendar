const events = [
  {
    id: 1,
    user: "Claudia",
    event: "Holiday",
    datestart: 1665385200,
    dateend: 1665417600
  },
  {
    id: 2,
    user: "Claudia",
    event: "Holiday",
    datestart: 1665471600,
    dateend: 1665504000
  },
  {
    id: 3,
    user: "Claudia",
    event: "Holiday",
    datestart: 1665644400,
    dateend: 1665676800
  },
  {
    id: 4,
    user: "Claudia",
    event: "Holiday",
    datestart: 1665730800,
    dateend: 1665763200
  },
  {
    id: 5,
    user: "All",
    event: "Bank Holiday",
    datestart: 1665558000,
    dateend: 1665590400
  },
  {
    id: 6,
    user: "Augusto",
    event: "Medical leave",
    datestart: 1664780400,
    dateend: 1664812800
  },
  {
    id: 7,
    user: "Livia",
    event: "Enter later",
    datestart: 1666861200,
    dateend: 1666861200
  },
  {
    id: 8,
    user: "Antonio",
    event: "Permission",
    datestart: 1666335600,
    dateend: 1666353600
  },
  {
    id: 9,
    user: "Petronilla",
    event: "Remote working",
    datestart: 1667548800,
    dateend: 1667570400
  }
];
const getTimeOfUnixDate = (unixDateTime) => {
  const date1 = new Date(unixDateTime * 1000);
  return new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  ).getTime();
};

const transformNumberTo2Digits = (number) => number.toString().padStart(2, "0");

const dateToHHMMSS = (date) =>
  transformNumberTo2Digits(date.getHours()) +
  ":" +
  transformNumberTo2Digits(date.getMinutes()) +
  ":" +
  transformNumberTo2Digits(date.getSeconds());

const dateToDDMMYYY = (date) =>
  transformNumberTo2Digits(date.getDate()) +
  "/" +
  transformNumberTo2Digits(date.getMonth() + 1) +
  "/" +
  date.getFullYear();

const getDayEvents = (dayInUnixFormat) => {
  return events.filter(
    (event) => getTimeOfUnixDate(event.datestart) === dayInUnixFormat
  );
};

// var x = document.getElementById("myDialog");

// function showDialog() {
//   x.show();
// }

// function closeDialog() {
//   x.close();
// }

const currentDate = new Date();

const generateClaendar = () => {
  // currentDate.setDate(1);
  const monthNames = [
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
    "December"
  ];

  const monthElement = document.querySelector(".month-value");
  const daysOfMonthElement = document.querySelector(".days");
  const yearElement = document.querySelector(".year-value");

  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  //total days of current mounth
  const totalDaysOfCurrentMonth = lastDayOfCurrentMonth.getDate();

  const lastDayIndexOfCurrentMonth = lastDayOfCurrentMonth.getDay();
  const nextDays = 7 - lastDayIndexOfCurrentMonth;

  const lastDateOfPreviousMonth = previousMonth.getDate();

  const lastDayOfPreviousMonth = previousMonth.getDay();

  let days = "";

  //Display the  month
  monthElement.textContent = monthNames[currentDate.getMonth()];

  //Display the value of year
  yearElement.textContent = currentDate.toDateString();

  //Display the days of the previous month
  for (let index = lastDayOfPreviousMonth; index > 0; index--) {
    days += `<div class="prev-days">${
      lastDateOfPreviousMonth - index + 1
    }</div>`;
  }
  //Display the days of the current month
  for (let i = 1; i <= totalDaysOfCurrentMonth; i++) {
    //set active to the current date

    const loopedDateInUnixFormat = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i
    ).getTime();

    const matchedEventsDays = [];
    const machedEvents = getDayEvents(loopedDateInUnixFormat);
    let events = "";

    if (machedEvents.length > 0) {
      console.log("looped", machedEvents);
      events += `<button class="show-btn" onclick="this.nextSibling.show()">*</button>`;
      events += `<dialog class="events"><button class="close-btn" onclick="this.closest('dialog').close()">X</button>`;

      machedEvents.forEach((event) => {
        const eventDateStart = new Date(event.datestart * 1000);
        const eventDateend = new Date(event.dateend * 1000);
        matchedEventsDays.push(eventDateStart.getDate());
        events += `<div class="events-block">
        <div class="events-user">${event.user}</div>
        <div class="events-name">${event.event}</div>
        <div "events-range">${dateToHHMMSS(eventDateStart)} - ${dateToHHMMSS(
          eventDateend
        )}</div>
        </div>`;
      });

      events += `</dialog>`;
    }

    console.log(events);
    const newDate = new Date();

    let activeClass =
      i === newDate.getDate() && currentDate.getMonth() === newDate.getMonth()
        ? "active"
        : "";

    if (matchedEventsDays.indexOf(i) !== -1) activeClass += " has-events";

    const dayContent = matchedEventsDays.indexOf(i) !== -1 ? i + events : i;
    days += `<div class=${activeClass}>${dayContent}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-days">${j}</div>`;
    daysOfMonthElement.innerHTML = days;
  }
};

[...document.querySelectorAll(".change-month")].map((button) =>
  button.addEventListener("click", (e) => {
    e.target.classList.contains("prev")
      ? currentDate.setMonth(currentDate.getMonth() - 1)
      : currentDate.setMonth(currentDate.getMonth() + 1);
    generateClaendar();
  })
);

generateClaendar();
