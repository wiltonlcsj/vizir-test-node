import Sequelize, { Model } from 'sequelize';

class CallPlan extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        minutes: Sequelize.DECIMAL(10, 2),
        excedent: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
        underscored: true,
      },
    );
  }
}

export default CallPlan;
