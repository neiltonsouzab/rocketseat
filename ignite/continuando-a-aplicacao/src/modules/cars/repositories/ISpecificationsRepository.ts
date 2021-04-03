import Specification from '../models/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
