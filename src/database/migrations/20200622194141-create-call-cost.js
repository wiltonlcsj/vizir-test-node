module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('call_costs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    origin: {
      type: Sequelize.STRING(3),
      allowNull: false,

    },
    destiny: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
    cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['origin', 'destiny'],
      },
    ],
  }),
  down: (queryInterface) => queryInterface.dropTable('call_costs'),
};
