import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

class AuthService {
  async middleware(headers) {
    const authHeader = headers.authorization;

    // Busca pela chave do autorization nos headers
    if (!authHeader) {
      return { status: 401, body: { error: 'Token not provided' } };
    }

    const [, token] = authHeader.split(' ');

    try {
      // Verifica se o JWT é valido
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      return { status: 200, userId: decoded.id };
    } catch (err) {
      return { status: 401, body: { error: 'Token invalid' } };
    }
  }
}

export default new AuthService();
