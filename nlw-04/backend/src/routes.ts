import { Router } from 'express';

import SurveyUserController from './controllers/SurveyUserController';
import SurveysController from './controllers/SurveysController';
import UserController from './controllers/UserController';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const surveyUserController = new SurveyUserController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);

router.get('/surveys', surveyController.index);
router.post('/surveys', surveyController.create);
router.post('/surveys_users', surveyUserController.create);
router.get('/answer/:value', answerController.execute);
router.get('/nps/:survey_id', npsController.execute);


export default router;