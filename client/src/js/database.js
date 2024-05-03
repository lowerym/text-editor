import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.error('PUT to the Database');

  // Creates a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Opens up the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .add() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.error('GET from the Database');

  // Creates a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Opens up the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .add() method on the store and passes in the content.
  const request = store.getAll();

  // Gets confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
