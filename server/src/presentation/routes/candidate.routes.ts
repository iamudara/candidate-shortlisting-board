import { Router } from 'express';
import { CandidateController } from '../controllers/candidate.controller';

const candidateRouter = Router();
const controller = new CandidateController();

candidateRouter.get('/', controller.getAll);
candidateRouter.get('/:id', controller.getOne);
candidateRouter.patch('/:id/status', controller.updateStatus);

export { candidateRouter };
