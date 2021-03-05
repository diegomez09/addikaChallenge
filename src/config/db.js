const Sequelize = require('sequelize');
//Initialize connection
const sequelize = new Sequelize('sql5396912','sql5396912','rFdzPKkb3N',{
    host:'sql5.freemysqlhosting.net:3306',
    dialect:'mysql'
});
//Test connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }