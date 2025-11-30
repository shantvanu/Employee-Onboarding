const db = require('../config/db');

/**
 * Insert a new submission
 */
const createSubmission = (id, createdAt, data) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO submissions (id, createdAt, data) VALUES (?, ?, ?)';

    db.run(query, [id, createdAt, JSON.stringify(data)], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

/**
 * Get paginated submissions
 */
const getSubmissions = ({ limit, offset, sortOrder }) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM submissions
      ORDER BY createdAt ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    db.all(query, [limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(
        rows.map((r) => ({
          id: r.id,
          createdAt: r.createdAt,
          data: JSON.parse(r.data)
        }))
      );
    });
  });
};

/**
 * Count total submissions
 */
const getSubmissionCount = () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) as count FROM submissions', (err, row) => {
      if (err) return reject(err);
      resolve(row.count);
    });
  });
};

/**
 * Get single submission by ID
 */
const getSubmissionById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM submissions WHERE id = ?',
      [id],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);

        resolve({
          id: row.id,
          createdAt: row.createdAt,
          data: JSON.parse(row.data)
        });
      }
    );
  });
};

/**
 * Update submission by ID
 */
const updateSubmission = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE submissions SET data = ? WHERE id = ?',
      [JSON.stringify(updatedData), id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes); // number of rows updated
      }
    );
  });
};

/**
 * Delete submission
 */
const deleteSubmission = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM submissions WHERE id = ?',
      [id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
};

/**
 * Search submissions (simple text search)
 */
const searchSubmissions = (query) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM submissions', (err, rows) => {
      if (err) return reject(err);

      const filtered = rows.filter((row) =>
        JSON.stringify(row.data)
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      resolve(
        filtered.map((r) => ({
          id: r.id,
          createdAt: r.createdAt,
          data: JSON.parse(r.data)
        }))
      );
    });
  });
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmissionCount,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  searchSubmissions
};