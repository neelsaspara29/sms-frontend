export function get_all_dates(year, month) {
  let date = new Date(year, month, 1);
  let dates = [];
  let i = 0;
  if (date.getDay() == 0) {
    dates = Array(6).fill(0);
  } else {
    dates = Array(date.getDay() - 1).fill(0);
  }

  console.log(date.getDay());
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
    i++;
  }
  let sliceDates = [];
  for (let index = 0; index < dates.length; index += 7) {
    sliceDates.push(dates.slice(index, 7 + index));
  }
  console.log(sliceDates);
  return sliceDates;
}
