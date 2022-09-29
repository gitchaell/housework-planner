export const weekDisplay = (date: Date) => {
  return date.toLocaleDateString('es', { day: 'numeric', weekday: 'long' });
};

export const hourDisplay = (date: Date) => {
  return date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false });
};