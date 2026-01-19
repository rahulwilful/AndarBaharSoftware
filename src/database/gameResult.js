import { initDB, saveDB } from "./sqlite";

export const saveGameResult = async (
  jokerCard,
  winner,
  winningCard
) => {
  const db = await initDB();

  db.run(
    `INSERT INTO game_result 
     (joker_card, winner, winning_card, time)
     VALUES (?, ?, ?, ?)`,
    [
      jokerCard.name,
      winner,
      winningCard,
      Date.now()
    ]
  );

  saveDB();
};

export const getAllGameResults = async () => {
  const db = await initDB();

  const result = db.exec(`
    SELECT * FROM game_result
    ORDER BY id DESC
  `);

  // sql.js returns data in a special format
  if (result.length === 0) return [];

  const columns = result[0].columns;
  const values = result[0].values;

  // convert to normal JS objects
  return values.map(row => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
};


