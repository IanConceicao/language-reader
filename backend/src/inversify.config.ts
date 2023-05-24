import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types";
import { RegistrableController } from "./controllers/RegistrableController";
import { TranslationController } from "./controllers/TranslationController";
import {
  TranslationService,
  TranslationServiceImpl,
} from "./services/TranslationService";
import {
  TranslationRepository,
  TranslationRepsositoryGoogleTranslate,
} from "./repositories/TranslationRepository";
import { QuizController } from "./controllers/QuizController";
import { QuizService, QuizServiceImpl } from "./services/QuizService";
import {
  QuizRepository,
  QuizRepositoryChatGPT,
} from "./repositories/QuizRepository";

const container = new Container();
container
  .bind<RegistrableController>(TYPES.Controller)
  .to(TranslationController);

container.bind<RegistrableController>(TYPES.Controller).to(QuizController);

container
  .bind<TranslationService>(TYPES.TranslationService)
  .to(TranslationServiceImpl);

container.bind<QuizService>(TYPES.QuizService).to(QuizServiceImpl);

container
  .bind<TranslationRepository>(TYPES.TranslationRepository)
  .to(TranslationRepsositoryGoogleTranslate);

container.bind<QuizRepository>(TYPES.QuizRepository).to(QuizRepositoryChatGPT);

export default container;
