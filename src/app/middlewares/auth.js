import AuthService from '../services/AuthService';

export default async (req, res, next) => {
  const service = await AuthService.middleware(req.headers);

  if (service.status === 200) {
    req.userId = service.userId;
    return next();
  } return res.status(service.status).json(service.body);
};
