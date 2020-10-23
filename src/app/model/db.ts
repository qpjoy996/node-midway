import { Sequelize } from 'sequelize-typescript';
import { provide, scope, ScopeEnum } from 'midway';
import {PostModel} from './post';

interface ISequelizeConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: any;
}

@scope(ScopeEnum.Singleton)
@provide("DB")
export class DB {
  public static sequelize: any;
  public static Sequelize: any;

  public static async initDB(config: ISequelizeConfig) {
    const dialect: any = config.dialect || "postgres";
    const sequelize = new Sequelize(config.database, config.username, config.password, {
      dialect,
      host: config.host,
      port: config.port,
      timezone: "+08:00",
      logging: true,
    });

    sequelize.addModels([
      PostModel,
    ]);

    DB.Sequelize = Sequelize;
    DB.sequelize = sequelize;

    try {
      await DB.sequelize.authenticate();
    }catch(error) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
