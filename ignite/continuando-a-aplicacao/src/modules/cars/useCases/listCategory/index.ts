import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import ListCategoiresController from './ListCategoriesController';
import ListCategoriesUseCase from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoiresController(
  listCategoriesUseCase,
);

export { listCategoriesController };
