import { Db } from 'mongodb';
import { TYPES } from '@constants/types';
import config from '@config/main';
import { AsyncContainerModule, interfaces } from 'inversify';
import { createMongodbConnection } from '@infrastructure/db/mongodb';

export const infrastructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) => {
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  bind<Db>(TYPES.Db).toConstantValue(db);
});