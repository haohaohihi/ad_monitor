const Sequelize = require('sequelize');
const sequelize = new Sequelize('ads', 'ads_test', 'hello', {
  host: '1.1.1.1',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate().then(() => {
  console.log("mysql connected");
})

module.exports = sequelize;