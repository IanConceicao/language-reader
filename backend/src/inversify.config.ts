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

const container = new Container();
container
  .bind<RegistrableController>(TYPES.Controller)
  .to(TranslationController);
container
  .bind<TranslationService>(TYPES.TranslationService)
  .to(TranslationServiceImpl);
container
  .bind<TranslationRepository>(TYPES.TranslationRepository)
  .to(TranslationRepsositoryGoogleTranslate);

export default container;
