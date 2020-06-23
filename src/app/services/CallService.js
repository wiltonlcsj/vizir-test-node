import * as Yup from 'yup';
import CallPlan from '../models/CallPlan';
import CallCost from '../models/CallCost';

class CallService {
  async calculate(body) {
    const schema = Yup.object().shape({
      origin: Yup.string().length(3).required(),
      destiny: Yup.string().length(3).required(),
      time: Yup.number().required(),
      plan: Yup.number().required(),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const plan = await CallPlan.findByPk(body.plan);

    /* Caso não encontre um plano para o valor passado */
    if (!plan) {
      return { status: 400, body: { error: 'This plan doesn\'t exists' } };
    }

    const { origin, destiny, time } = body;
    const call_cost = await CallCost.findOne({
      where: {
        origin,
        destiny,
      },
    });

    /* Caso não encontre um custo para a chamada */
    if (!call_cost) {
      return { status: 400, body: { error: 'Doesn\'t exists a defined cost for origin and destiny' } };
    }

    const excedent_minutes = time - plan.minutes;

    /* Se o tempo da chamada não estoura a minutagem do plano */
    if (excedent_minutes <= 0) {
      return {
        status: 200,
        body: {
          cost_with_plan: 0,
          cost_without_plan: time * call_cost.cost,
        },
      };
    }

    /* Caso haja minutos excedentes a minutagem do plano */
    /* O valor por minuto deve ser recalculado de acordo com a porcentagem de excedência */
    const excedent_value = excedent_minutes
      * ((call_cost.cost * plan.excedent) + parseFloat(call_cost.cost));

    return {
      status: 200,
      body: {
        cost_with_plan: excedent_value,
        cost_without_plan: time * call_cost.cost,
      },
    };
  }
}

export default new CallService();
