// ===========================
// Requires
// ===========================
const Sequelize = require('sequelize');
// ===========================
// Models
// ===========================
const UserModel = require('../models/user');
const PostModel = require('../models/post');
//Initialize connection
const sequelize = new Sequelize('addika', 'user', 'rFdzPKkb3N', {
  host: 'localhost',
  dialect: 'mysql'
});
//Test connection
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas creadas');
  });

module.exports = {
  User,
  Post
}