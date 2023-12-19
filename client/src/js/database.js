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
  try {
    // Opening database, named textEditor_db, version 1
    const db = await openDB('textEditor_db', 1);
    // Starting a new read/write transaction on the 'notes' object store
    const tx = db.transaction('notes', 'readwrite');
    // Accessing the 'notes' object store
    const store = tx.objectStore('notes');
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

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
