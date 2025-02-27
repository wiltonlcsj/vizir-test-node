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
      unique: true,
    },
    minutes: {
      type: Sequelize.DECIMAL(10, 2),
    },
    excedent: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.1,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('call_plans'),
};
