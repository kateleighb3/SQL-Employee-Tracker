const Sequelize = require('sequelize');

// Create a connection object
const sequelize = new Sequelize(
  // Database name
  'employee_db',
  // User
  'root',
  // Password
  'Root1root2!',
  {
    // Database location
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;