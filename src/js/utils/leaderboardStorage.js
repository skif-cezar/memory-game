const LEADERBOARD_KEY = 'star_wars_memory_game_leaderboard';
const MAX_LEADERBOARD_ENTRIES = 10;

export const getLeaderboard = () => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading leaderboard from localStorage:', error);
    return [];
  }
};

export const saveGameResult = (movesCount) => {
  const currentLeaderboard = getLeaderboard();

  const newEntry = {
    moves: movesCount,
    date: new Date().toLocaleDateString('ru-RU'),
  };

  currentLeaderboard.push(newEntry);

  // Sort result
  currentLeaderboard.sort((a, b) => a.moves - b.moves);

  const top10 = currentLeaderboard.slice(0, MAX_LEADERBOARD_ENTRIES);

  // We are recounting the places from 1 to 10
  const updatedLeaderboard = top10.map((entry, index) => ({
    place: index + 1,
    moves: entry.moves,
    date: entry.date,
  }));

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
  } catch (error) {
    console.error('Error saving the leaderboard to localStorage:', error);
  }

  return updatedLeaderboard;
};
