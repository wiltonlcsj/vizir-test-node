import 'jest-extended';
import 'jest-chain';
import faker from 'faker/locale/pt_BR';
import '../../../src/database';
import UserService from '../../../src/app/services/UserService';

describe('Session Controller Tests', () => {
  it('If no password was provided must return a status 400 and error message', async () => {
    const data = await UserService.login({ email: faker.internet.email() });
    expect(data.status).toBeDefined().toBe(400);
    expect(data.body).toHaveProperty('error');
  });

  it('If no user has found with credentials must return a status 401 and error message', async () => {
    const data = await UserService.login({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(data.status).toBeDefined().toBe(401);
    expect(data.body).toHaveProperty('error');
  });

  it('If password doesn\'t match must return a status 401 and error message', async () => {
    const { email } = (await UserService.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })).body;

    const data = await UserService.login({
      email,
      password: faker.internet.password(),
    });

    expect(data.status).toBeDefined().toBe(401);
    expect(data.body).toHaveProperty('error');
  });

  it('If login was successfull must return a token', async () => {
    const password = faker.internet.password();
    const { email } = (await UserService.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
    })).body;

    const data = await UserService.login({
      email,
      password,
    });

    expect(data.body).toHaveProperty('token');
  });
});
