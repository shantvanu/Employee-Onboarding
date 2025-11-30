// src/config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      createdAt TEXT NOT NULL,
      data TEXT NOT NULL
    )
  `);
});

module.exports = db;
