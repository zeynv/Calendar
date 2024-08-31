function getWeeks(date) {
  let week = date.getDay();
  if (week == 0) week = 7;
  return week - 1;
}

function createCalendar(today, month) {
  let rl = new Date();
  let year = today.getFullYear();
  let day = today.getDate();
  let week = getWeeks(today);
  let arrOfMonth = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  let table = `
    <table>
    <caption>${arrOfMonth[month]} | ${year}</caption>
    <thead>
        <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
    `;

  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month + 1, 0);

  for (let i = 0; i < getWeeks(firstDay); i++) {
    table += `<td></td>`;
  }

  while (firstDay.getTime() <= lastDay.getTime()) {
    let dayOfWeek = firstDay.getDay();

    if (
      firstDay.getDate() == day &&
      month == rl.getMonth() &&
      year == rl.getFullYear()
    ) {
      table += `<td class="active">${firstDay.getDate()}</td>`;
    } else {
      if (dayOfWeek == 0) dayOfWeek = 7;
      dayOfWeek--;
      if (dayOfWeek == 0) {
        table += `<tr>`;
      }
      table += `<td>${firstDay.getDate()}</td>`;
      if (dayOfWeek == 6) {
        table += `</tr>`;
      }
    }

    firstDay.setDate(firstDay.getDate() + 1);
  }

  let container = document.querySelector(".container");
  let calendar = document.querySelector(".calendar");
  table += `</tr></tbody></table>`;
  calendar.innerHTML = table;
}

let today = new Date();
let month = today.getMonth();

let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

ctOfClicksPrev = 48;
ctOfClicksNext = 1; //
prevBtn.addEventListener("click", function () {
  if (ctOfClicksPrev > 1) {
    month--;
    ctOfClicksPrev--;
    createCalendar(today, month);
    if (month == 0) {
      month = 11;
      today = new Date(today.getFullYear() - 1, 11);
    }
  }
});

nextBtn.addEventListener("click", function () {
  if (ctOfClicksNext < 48) {
    month++;
    ctOfClicksNext++;
    createCalendar(today, month);
    if (month == 11) {
      month = 0;
      today = new Date(today.getFullYear() + 1, 0);
    }
  }
});

createCalendar(today, month);
