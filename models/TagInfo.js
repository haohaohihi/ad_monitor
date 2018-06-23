const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const TagInfo = sequelize.define('TagInfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tagName: {
        type: Sequelize.STRING(100),
        allowNull:false,
        unique: true
    },
    freq: {
        type: Sequelize.INTEGER(11),
        allowNull:false,
        defaultValue: 0
    },
}, {
    timestamps: false,
    tableName: 'tagInfo',
});

module.exports = TagInfo;