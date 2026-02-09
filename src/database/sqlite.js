import initSqlJs from "sql.js";

let db = null;

export const initDB = async () => {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `/sql-wasm.wasm`,
  });

  // Load saved DB
  const saved = localStorage.getItem("game_sqlite");

  if (saved) {
    const bytes = Uint8Array.from(atob(saved), (c) => c.charCodeAt(0));
    db = new SQL.Database(bytes);
  } else {
    db = new SQL.Database();

    db.run(`
      CREATE TABLE IF NOT EXISTS game_result (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        joker_card TEXT,
        winner TEXT,
        winning_card TEXT,
        time INTEGER
      );
    `);
  }

  return db;
};

export const saveDB = () => {
  const data = db.export();
  const base64 = btoa(String.fromCharCode(...data));
  localStorage.setItem("game_sqlite", base64);
};
