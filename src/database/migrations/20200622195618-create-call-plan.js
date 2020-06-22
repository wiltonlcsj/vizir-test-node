module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('call_plans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    minutes: {
      type: Sequelize.DECIMAL(10, 2),
    },
    excedent: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.1,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('call_plans'),
};
