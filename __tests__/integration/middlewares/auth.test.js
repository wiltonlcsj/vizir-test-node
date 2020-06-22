import 'jest-extended';
import 'jest-chain';
import request from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../../src/app';
import UserService from '../../../src/app/services/UserService';

describe('Auth Middleware Tests', () => {
  it('If no token is provided to a private route', async () => {
    const data = await request(app).put('/users').send();

    expect(data.status).toBeDefined().toBe(401);
    expect(data.body).toHaveProperty('error');
  });

  it('If token is provided to a private route but is invalid', async () => {
    const data = await request(app).put('/users')
      .set('Authorization', 'Bearer 0000000').send();

    expect(data.status).toBeDefined().toBe(401);
    expect(data.body).toHaveProperty('error');
  });

  it('If token is provided and it is valid', async () => {
    const user = { email: faker.internet.email(), password: faker.internet.password() };

    await UserService.create({
      name: faker.name.findName(),
      email: user.email,
      password: user.password,
    });

    const response = await UserService.login(user);

    const data = await request(app).put('/users')
      .set('Authorization', `Bearer ${response.body.token}`).send({
        name: faker.name.findName(),
      });

    expect(data.status).not.toBe(401);
  });
});
