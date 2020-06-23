import CostService from '../services/CostService';

class CostController {
  async index(req, res) {
    const service = await CostService.index(req.query);
    return res.status(service.status).json(service.body);
  }

  async store(req, res) {
    const service = await CostService.create(req.body);
    return res.status(service.status).json(service.body);
  }

  async update(req, res) {
    const service = await CostService.update(req.body, req.params.id);
    return res.status(service.status).json(service.body);
  }

  async delete(req, res) {
    const service = await CostService.delete(req.params.id);
    return res.status(service.status).json(service.body);
  }
}

export default new CostController();
