import PlanService from '../services/PlanService';

class PlanController {
  async index(req, res) {
    const service = await PlanService.index(req.query);
    return res.status(service.status).json(service.body);
  }

  async store(req, res) {
    const service = await PlanService.create(req.body);
    return res.status(service.status).json(service.body);
  }

  async update(req, res) {
    const service = await PlanService.update(req.body, req.params.id);
    return res.status(service.status).json(service.body);
  }

  async delete(req, res) {
    const service = await PlanService.delete(req.params.id);
    return res.status(service.status).json(service.body);
  }
}

export default new PlanController();
