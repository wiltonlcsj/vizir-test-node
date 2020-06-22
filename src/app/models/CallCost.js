import Sequelize, { Model } from 'sequelize';

class CallCost extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        origin: Sequelize.STRING(3),
        destiny: Sequelize.STRING(3),
        cost: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
        underscored: true,
      },
    );
  }
}

export default CallCost;
