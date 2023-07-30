//Import idb library
import { openDB } from 'idb';

//Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the object store 'jate' already exists in the database
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // If 'jate' object store doesn't exist, create it ('id' as the key and auto-increment enabled)
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT request to update the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  // Use the 'put' method to add the content to the 'jate' object store
  const req = objStore.put({ jate: content})
  const res = await req;
  console.log('data saved to the jateDB', res);
};

// Method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting data from the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  // Use the 'getAll' method to retrieve all the data from the 'jate' object store
  const req = objStore.getAll()
  const res = await req;
  console.log('data saved to the jateDB', res);
};

//Call function to initialize db
initdb();
