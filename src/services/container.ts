import { CareerRepository } from '../repositories/career.repository';
import { MongoCareerRepository } from '../repositories/mongo-career.repository';
import { CareerService } from './career.service';

const repository: CareerRepository = new MongoCareerRepository();
export const careerService = new CareerService(repository);
