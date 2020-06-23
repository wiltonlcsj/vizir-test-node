import * as Yup from 'yup';
import CallCost from '../models/CallCost';

class CostService {
  async index(queryParams) {
    const { page = 1, per_page = 10 } = queryParams;

    const plans = await CallCost.findAll({
      limit: parseInt(per_page, 10),
      offset: parseInt(per_page * (page - 1), 10),
    });

    return { status: 200, body: { plans } };
  }

  async create(body) {
    const schema = Yup.object().shape({
      origin: Yup.string().length(3).required(),
      destiny: Yup.string().length(3).required(),
      cost: Yup.number().required(),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    // Checa se existe custo existente com a origin e destino
    const existCost = await CallCost.findOne({
      where: {
        origin: body.origin,
        destiny: body.destiny,
      },
    });

    if (existCost) {
      return { status: 400, body: { error: 'Cost already exists for origin and destiny' } };
    }

    const {
      id, origin, destiny, cost,
    } = await CallCost.create(body);
    return {
      status: 200,
      body: {
        id, origin, destiny, cost,
      },
    };
  }

  async update(body, id) {
    const schema = Yup.object().shape({
      cost: Yup.number().required(),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const existCost = await CallCost.findByPk(id);
    if (!existCost) {
      return { status: 404, body: { error: 'Cost not found' } };
    }

    const { origin, destiny, cost } = await existCost.update(body);

    return {
      status: 200,
      body: {
        id, origin, destiny, cost,
      },
    };
  }

  async delete(id) {
    const cost = await CallCost.findByPk(id);
    if (!cost) {
      return { status: 404, body: { error: 'Cost not found' } };
    }

    if (await cost.destroy()) {
      return { status: 200, body: { message: 'Delete was successfull' } };
    }

    return { status: 400, body: { error: 'Something occured, please try again' } };
  }
}

export default new CostService();
