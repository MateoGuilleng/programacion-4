const { Sequelize, DataTypes } = require('sequelize');
const GameModel = require('./game');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Initialize models
const Game = GameModel(sequelize, DataTypes);

// Export models and sequelize
module.exports = {
  sequelize,
  Game
};