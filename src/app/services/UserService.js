import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class UserService {
  async login(body) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const { email, password } = body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: 401, body: { error: 'User not found' } };
    }

    if (!(await user.checkPassword(password))) {
      return { status: 401, body: { error: 'Password does not match' } };
    }

    const { id, name } = user;

    return {
      status: 200,
      body: {
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      },
    };
  }

  async create(body) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const userExists = await User.findOne({ where: { email: body.email } });
    if (userExists) {
      return { status: 400, body: { error: 'User already exists' } };
    }

    const {
      id, name, email,
    } = await User.create(body);
    return {
      status: 200,
      body: {
        id, name, email,
      },
    };
  }

  async update(body, userId) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(body))) {
      return { status: 400, body: { error: 'Validation fails' } };
    }

    const { email, oldPassword } = body;
    const user = await User.findByPk(userId);

    if (email && (email !== user.email)) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return { status: 400, body: { error: 'User already exists' } };
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return { status: 401, body: { error: 'Password does not match' } };
    }

    const { id, name } = await user.update(body);

    return {
      status: 200,
      body: {
        id, name, email,
      },
    };
  }
}

export default new UserService();
