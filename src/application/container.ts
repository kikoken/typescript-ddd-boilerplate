import { TYPES } from '@constants/types';
import { ContainerModule, interfaces } from 'inversify';
import { HelloApplicationService } from './hello/HelloApplicationService';

export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    bind<HelloApplicationService>(TYPES.HelloApplication).to(HelloApplicationService);
  }
);