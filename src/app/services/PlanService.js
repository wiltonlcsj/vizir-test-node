import * as Yup from 'yup';
import CallPlan from '../models/CallPlan';

class PlanService {
  async index(queryParams) {
    const { page = 1, per_page = 10 } = queryParams;

    const plans = await CallPlan.findAll({
      attributes: ['id', 'name', 'minutes', 'excedent'],
      limit: parseInt(per_page, 10),
      offset: parseInt(per_page * (page - 1), 10),
    });

    return { status: 200, body: { plans } };
  }

  async create(body) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      minutes: Yup.number().required(),
      excedent: Yup.number().max(1).min(0),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    // Checa se existe plano existente com o nome do cadastro
    const planExists = await CallPlan.findOne({ where: { name: body.name } });
    if (planExists) {
      return { status: 400, body: { error: 'Plan name already exists' } };
    }

    const {
      id, name, minutes, excedent,
    } = await CallPlan.create(body);
    return {
      status: 200,
      body: {
        id, name, minutes, excedent,
      },
    };
  }

  async update(body, id) {
    const schema = Yup.object().shape({
      minutes: Yup.number().required(),
      excedent: Yup.number().max(1).min(0).required(),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const plan = await CallPlan.findByPk(id);
    if (!plan) {
      return { status: 404, body: { error: 'Plan not found' } };
    }

    const { name, minutes, excedent } = await plan.update(body);

    return {
      status: 200,
      body: {
        id, name, minutes, excedent,
      },
    };
  }

  async delete(id) {
    const plan = await CallPlan.findByPk(id);
    if (!plan) {
      return { status: 404, body: { error: 'Plan not found' } };
    }

    if (await plan.destroy()) {
      return { status: 200, body: { message: 'Delete was successfull' } };
    }

    return { status: 400, body: { error: 'Something occured, please try again' } };
  }
}

export default new PlanService();
