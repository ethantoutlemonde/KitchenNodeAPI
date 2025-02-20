import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/database.sqlite',
  logging: false
});

export default sequelize;
