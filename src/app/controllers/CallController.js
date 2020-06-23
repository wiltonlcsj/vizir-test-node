import CallService from '../services/CallService';

class CallController {
  async calculate(req, res) {
    const service = await CallService.calculate(req.body);
    return res.status(service.status).json(service.body);
  }
}

export default new CallController();
