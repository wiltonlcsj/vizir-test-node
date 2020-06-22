import UserService from '../services/UserService';

class UserController {
  async store(req, res) {
    const service = await UserService.create(req.body);
    return res.status(service.status).json(service.body);
  }

  async update(req, res) {
    const service = await UserService.update(req.body, req.userId);
    return res.status(service.status).json(service.body);
  }
}

export default new UserController();
