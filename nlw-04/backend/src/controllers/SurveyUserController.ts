import path from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

class SurveyUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysReposistory = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: 'User does not exists.' });
    }

    const survey = await surveysReposistory.findOne(survey_id);

    if (!survey) {
      return response.status(400).json({ message: 'Survey does not exists.' });
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { 
        user_id: user.id, 
        value: null 
      },
      relations: ['user', 'survey'],
    });

    const templatePath = path
      .resolve(__dirname, '..', 'views', 'emails', 'NPSMail.hbs');

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: `${process.env.API_URL}/answers`
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, survey.title, variables, templatePath);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, templatePath);

    await surveysUsersRepository.save(surveyUser);

    return response.status(201).json(surveyUser);
  }
}

export default SurveyUserController;