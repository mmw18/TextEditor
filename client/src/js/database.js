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

// Exporting function we will use to post/update content from the database
export const putDb = async (content) => {
  try {
    // Opening database, named JATE, version 1
    const db = await openDB('JATE', 1);
    // Starting a new read/write transaction on the 'JATE' object store
    const tx = db.transaction('JATE', 'readwrite');
    // Accessing the 'JATE' object store
    const store = tx.objectStore('JATE');
    // Attempt to add or update the content within the store
    const request = store.put(content);
    // Waiting for the request to complete and get the result
    const result = await request;
    // Ensuring transaction is completed before moving on
    await tx.done;
    // Logging successful operation to the console
    console.log('Data saved to the database', result);
    // Returning result - for processing or confirmation
    return result; 
    // Logging any errors that occur during operation
  } catch (error) {
    console.error('Error putting data into IndexedDB', error);
  }
};

// Exporting function we will use to GET all content from the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Creating a connection to the 'JATE' database, specifying version 1.
  const db = await openDB('JATE', 1);

  // Creating a new transaction, specifying object store and setting it to 'readonly'.
  const tx = db.transaction('JATE', 'readonly');

  // Opening the desired object store.
  const store = tx.objectStore('JATE');

  // Using the .getAll() method to get all data from the store.
  const result = await store.getAll();

  // Logging the results andreturning them
  console.log('All data from the database:', result);
  return result;
};

initdb();
