export const toDateArray = (date: Date) => {

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return [year, month, day, hour, minutes, seconds];
};