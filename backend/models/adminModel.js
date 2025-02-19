const db = require('../config/db');

class Admin {
  static getAdminByEmail(email, callback) {
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], callback);
  }

  static createAdmin({ email, password, mobile_number }, callback) {
    const query = 'INSERT INTO admin (email, password, mobile_number) VALUES (?, ?, ?)';
    db.query(query, [email, password, mobile_number], callback);
  }
}

module.exports = Admin;
