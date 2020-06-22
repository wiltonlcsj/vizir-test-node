import 'jest-extended';
import 'jest-chain';
import faker from 'faker/locale/pt_BR';
import '../../../src/database';
import UserService from '../../../src/app/services/UserService';

describe('User Controller Tests', () => {
  describe('Store Method', () => {
    it('If no password was provided must return a status 400 and error message', async () => {
      const data = await UserService.create({
        email: faker.internet.email(),
        name: faker.name.findName(),
      });

      expect(data.status).toBeDefined().toBe(400);
      expect(data.body).toHaveProperty('error');
    });

    it('If user email already exists on database must return a status 400', async () => {
      const { email } = (await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })).body;

      const data = await UserService.create({
        name: faker.name.findName(),
        email,
        password: faker.internet.password(),
      });

      expect(data.status).toBeDefined().toBe(400);
      expect(data.body).toHaveProperty('error');
    });

    it('If user was successful on store must return a status 200 and id', async () => {
      const data = await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      expect(data.status).toBeDefined().toBe(200);
      expect(data.body).toHaveProperty('id');
    });
  });

  describe('Update Method', () => {
    it('If password has less than 6 digits', async () => {
      const oldPassword = faker.internet.password();
      const { id } = (await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: oldPassword,
      })).body;

      const new_password = faker.internet.password(5);
      const data = await UserService.update({
        oldPassword,
        password: new_password,
        confirm_password: new_password,
      }, id);

      expect(data.status).toBeDefined().toBe(400);
      expect(data.body).toHaveProperty('error');
    });

    it('If new email is already in use', async () => {
      const { id } = (await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })).body;

      const { email } = (await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })).body;

      const data = await UserService.update({
        email,
      }, id);

      expect(data.status).toBeDefined().toBe(400);
      expect(data.body).toHaveProperty('error');
    });

    it('If old password doesn\'t match ', async () => {
      const oldPassword = faker.internet.password();
      const { id } = (await UserService.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: oldPassword,
      })).body;

      const new_password = faker.internet.password();
      const data = await UserService.update({
        oldPassword: new_password,
        password: new_password,
        confirmPassword: new_password,
      }, id);

      expect(data.status).toBeDefined().toBe(401);
      expect(data.body).toHaveProperty('error');
    });
  });

  it('If the update was successful', async () => {
    const { id } = (await UserService.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })).body;

    const data = await UserService.update({
      name: faker.name.findName(),
      email: faker.internet.email(),
    }, id);

    expect(data.status).toBeDefined().toBe(200);
    expect(data.body).toHaveProperty('id');
  });
});
