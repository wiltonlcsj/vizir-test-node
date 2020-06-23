import 'jest-extended';
import 'jest-chain';
import '../../../src/database';
import faker from 'faker/locale/pt_BR';
import CallService from '../../../src/app/services/CallService';
import PlanService from '../../../src/app/services/PlanService';
import CostService from '../../../src/app/services/CostService';

describe('Calculate method test', () => {
  it('If no origin was provided must return a 400 status', async () => {
    const data = await CallService.calculate({
      destiny: `0${faker.random.number({ min: 10, max: 99 })}`,
    });

    expect(data.status).toBe(400);
    expect(data.body).toHaveProperty('error');
  });

  it('If no plan was found by id must return a 400 status', async () => {
    const data = await CallService.calculate({
      destiny: `0${faker.random.number({ min: 10, max: 99 })}`,
      origin: `0${faker.random.number({ min: 10, max: 99 })}`,
      time: faker.random.number(),
      plan: faker.random.number(),
    });

    expect(data.status).toBe(400);
    expect(data.body).toHaveProperty('error');
  });

  it('If no cost was found by id must return a 400 status', async () => {
    const plan = await PlanService.create({
      name: `Plan ${faker.random.number({ min: 0, max: 30 })}`,
      minutes: faker.random.number({ min: 0, max: 30 }),
    });

    const data = await CallService.calculate({
      destiny: `0${faker.random.number({ min: 10, max: 99 })}`,
      origin: `0${faker.random.number({ min: 10, max: 99 })}`,
      time: faker.random.number(),
      plan: plan.body.id,
    });

    expect(data.status).toBe(400);
    expect(data.body).toHaveProperty('error');
  });

  it('If all fields are provided and the time doesn\' exceed the plan', async () => {
    const cost = await CostService.create({
      destiny: `0${faker.random.number({ min: 10, max: 99 })}`,
      origin: `0${faker.random.number({ min: 10, max: 99 })}`,
      cost: faker.random.number({ min: 0.1, max: 5.0 }),
    });

    const plan = await PlanService.create({
      name: `Plan ${faker.random.number()}`,
      minutes: 30,
    });

    const data = await CallService.calculate({
      destiny: cost.body.destiny,
      origin: cost.body.origin,
      time: faker.random.number({ min: 1, max: 5 }),
      plan: plan.body.id,
    });

    expect(data.status).toBe(200);
    expect(data.body).toHaveProperty('cost_with_plan');
    expect(data.body.cost_with_plan).toBe(0);
  });

  it('If all fields are provided and the time exceed the plan', async () => {
    const cost = await CostService.create({
      destiny: `0${faker.random.number({ min: 10, max: 99 })}`,
      origin: `0${faker.random.number({ min: 10, max: 99 })}`,
      cost: faker.random.number({ min: 0.1, max: 5 }),
    });

    const plan = await PlanService.create({
      name: `Plan ${faker.random.number()}`,
      minutes: faker.random.number({ min: 0, max: 30 }),
    });

    const data = await CallService.calculate({
      destiny: cost.body.destiny,
      origin: cost.body.origin,
      time: faker.random.number({ min: 31, max: 100 }),
      plan: plan.body.id,
    });

    expect(data.status).toBe(200);
    expect(data.body).toHaveProperty('cost_with_plan');
    expect(data.body.cost_with_plan).not.toBe(0);
  });
});
