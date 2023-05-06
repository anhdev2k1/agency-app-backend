import moment from 'moment';

const getDateListFromMonth = (month) => {
  const daysArray = [];
  if (!month) {
    month = moment().format('MM/YYYY');
  }

  const firstDayOfMonth = moment(month, 'MM-YYYY').startOf('month');

  for (let day = 0; day < firstDayOfMonth.daysInMonth(); day++) {
    const date = firstDayOfMonth.clone().add(day, 'day');
    const formattedDate = date.format('DD/MM/YYYY');
    daysArray.push(formattedDate);
  }

  return daysArray;
};

const getMonthListFromYear = (year) => {
  if (!year) {
    year = moment().year();
  }
  const months = Array.from({ length: 12 }, (_, i) =>
    moment({ year, month: i }).format('MM/YYYY')
  );

  return months;
};

export default { getDateListFromMonth, getMonthListFromYear };
