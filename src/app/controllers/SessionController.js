import UserService from '../services/UserService';

class SessionController {
  async login(req, res) {
    const service = await UserService.login(req.body);
    return res.status(service.status).json(service.body);
  }
}

export default new SessionController();
