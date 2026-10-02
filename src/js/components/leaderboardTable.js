export const createLeaderboardTable = (data = []) => {
  const table = document.createElement('table');
  table.classList.add('leaderboard');

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const headers = ['Place', 'Moves', 'Date'];

  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = document.createElement('tbody');

  if (data.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = headers.length;
    emptyCell.textContent = 'No games finished yet';
    emptyCell.classList.add('leaderboard__empty');
    emptyRow.append(emptyCell);
    tbody.append(emptyRow);
  } else {
    data.forEach((row) => {
      const tr = document.createElement('tr');

      const tdPlace = document.createElement('td');
      tdPlace.textContent = row.place;

      const tdMoves = document.createElement('td');
      tdMoves.textContent = row.moves;

      const tdDate = document.createElement('td');
      tdDate.textContent = row.date;

      tr.append(tdPlace, tdMoves, tdDate);
      tbody.append(tr);
    });
  }

  table.append(thead, tbody);
  return table;
};
