const DB_NAME = "AndarBaharDB";
const STORE_NAME = "game_result";
const DB_VERSION = 1;

// OPEN DATABASE
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveGameResult = async (
  jokerCard,
  jokerValue,
  winner,
  winningCard,
) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("game_result", "readwrite");
    const store = tx.objectStore("game_result");

    store.add({
      jokerCard,
      jokerValue,
      winner,
      winningCard,
      is_deleted: false,
      manual_entry: false,
      time: Date.now(),
    });

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const addManualEntry = async (winner, jokerValue) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("game_result", "readwrite");
    const store = tx.objectStore("game_result");

    store.add({
      jokerCard: null,
      jokerValue,
      winner,
      winningCard: null,
      is_deleted: false,
      manual_entry: true,
      time: Date.now(),
    });

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getAllGameResults = async () => {
  //keepOnlyLast200Records()
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const filtered = request.result.filter(
        (item) => item.is_deleted === false,
      );
      resolve(filtered);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getAllTrueGameResults = async () => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("game_result", "readonly");
    const store = tx.objectStore("game_result");

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => reject(request.error);
  });
};

export const deleteLastDataFromDB = async () => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const data = request.result;

      if (data.length === 0) {
        resolve(false);
        return;
      }

      // get last inserted record
      const lastItem = data[data.length - 1];

      // HARD DELETE using primary key
      store.delete(lastItem.id);

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    };

    request.onerror = () => reject(request.error);
  });
};

export const softDeleteAllData = async () => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const data = request.result;

      data.forEach((item) => {
        item.is_deleted = true;
        store.put(item);
      });

      resolve(true);
    };

    request.onerror = () => reject(request.error);
  });
};

export const retrieveSoftDeletedData = async () => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const data = request.result;

      data.forEach((item) => {
        item.is_deleted = false;
        store.put(item);
      });

      resolve(true);
    };

    request.onerror = () => reject(request.error);
  });
};

export const keepOnlyLast200Records = async () => {
  console.log("keepOnlyLast200Records called")
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const data = request.result;

      if (data.length <= 10) {
        resolve(true); // nothing to delete
        return;
      }

      // Sort by time descending (latest first)
      const sorted = data.sort((a, b) => b.time - a.time);

      // Records to delete (everything after 200)
      const recordsToDelete = sorted.slice(10);

      recordsToDelete.forEach((item) => {
        store.delete(item.id);
      });

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    };

    request.onerror = () => reject(request.error);
  });
};

export const hardDeleteAllData = async () => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.clear();

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};
