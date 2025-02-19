const db = require('../config/db');

const History = {
  create: (role, name, email, password, address, qualification, action) => {
    const query = 'INSERT INTO history (role, name, email, password, address, qualification, action) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return db.query(query, [role, name, email, password, address, qualification, action]);
  },

  getHistory: (role) => {
    const query = 'SELECT * FROM history WHERE role = ? ORDER BY timestamp DESC';
    return db.query(query, [role]);
  }
};

module.exports = History;
