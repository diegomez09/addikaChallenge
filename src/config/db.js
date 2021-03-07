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
//Insert new users
const users = [
  {
    role: 'ADMIN',
    email: 'admin@mail.com',
    //Password:123456
    password: '$2a$10$VrySnTUF.TaT5PZSpJICWuCXD1Uy/YJ.v9x0LuGaYUDkESDIkp17m',
    permissions: 'ADMIN'
  }, {
    role: 'USER',
    email: 'create@mail.com',
    //Password:123456
    password: '$2a$10$rPMUOlwMo7lqazIPKAf7NeLftJzK2VrVKjA0hJItW6ksgpgOcgyFS',
    permissions: 'CREATE'
  }, {
    role: 'USER',
    email: 'update@mail.com',
    //Password:123456
    password: '$2a$10$zCsaA/ohgfae1QrPVoGn7ORVBKtqUaPMUF9MOCTChupDx8zdHbAjC',
    permissions: 'update'
  }
];

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas');
  }).then(() => {
    users.forEach(user => User.create(user));
  });

module.exports = {
  User,
  Post,
  Review,
  Log
}