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
