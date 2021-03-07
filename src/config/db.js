// ===========================
// Requires
// ===========================
const Sequelize = require('sequelize');
// ===========================
// Models
// ===========================
const UserModel = require('../models/user');
const PostModel = require('../models/post');
const ReviewModel = require('../models/review');
const LogModel = require('../models/log');
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
const Review = ReviewModel(sequelize, Sequelize);
const Log = LogModel(sequelize, Sequelize);

// Post.hasMany(Review, { foreignKey: 'review' });
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas creadas');
  });

module.exports = {
  User,
  Post,
  Review,
  Log
}