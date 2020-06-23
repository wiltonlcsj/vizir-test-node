import Sequelize from 'sequelize';

import User from '../app/models/User';
import CallPlan from '../app/models/CallPlan';
import CallCost from '../app/models/CallCost';

import databaseConfig from '../config/database';

const models = [User, CallPlan, CallCost];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models),
    );
  }
}

export default new Database();
