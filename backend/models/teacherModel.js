const db = require('../config/db');

const Teacher = {
  create: (email, password, address, qualification) => {
    const query = 'INSERT INTO teacher (email, password, address, qualification) VALUES (?, ?, ?, ?)';
    return db.query(query, [email, password, address, qualification]);
  },

  getHistory: () => {
    const query = 'SELECT * FROM history WHERE role = "teacher" ORDER BY timestamp DESC LIMIT 5';
    return db.query(query);
  }
};

module.exports = Teacher;
