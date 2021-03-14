import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";

class SurveysController {

  async index(request: Request, response: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveyRepository);

    const surveys = await surveysRepository.find();

    return response.json(surveys);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveyRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

}

export default SurveysController;