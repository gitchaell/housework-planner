export const style = `
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

*, html, body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
}

div.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
}

table {
  border-collapse: collapse;
  border-top: 1px solid #dfe0e2;
  border-left: 1px solid #dfe0e2;
}

table tr:nth-child(2) th:not(:first-child) {
  width: 115px;
  min-width: 115px;
}

table th {
  background-color: #f9fafb;
  color: #111827;
  text-align: center;
}

table th,
table td {
  font-size: 0.8rem;
  padding: 4px;
  border-right: 1px solid #dfe0e2;
  border-bottom: 1px solid #dfe0e2;
  vertical-align: top;
}

table td.blocked {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%236b7280' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

table div {
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 4px;
  align-items: start;
  font-size: inherit;
  max-width: 115px;
}

table span {
  font-size: inherit;
  background-color: #f9fafb;
  border: 1px solid #dfe0e2;
  border-radius: 4px;
  padding: 4px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`;