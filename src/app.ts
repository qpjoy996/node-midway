import { Application } from 'midway';
// import Migration from './lib/migration';
import { DB } from './app/model/db';

class AppBootHook {
    app: Application;
    constructor(app: Application) {
        this.app = app;
    }

    configWillLoad() {
        console.log(`[Avatar log]: config will load`);
    }

    async didLoad() {
        console.log(`[Avatar log]: config did load`);
    }

    async willReady() {
        console.log(`[Avatar log]: App will Ready!!`);
        await DB.initDB(this.app.config.sequelize);

        const schema = 'node_midway';
        let existSchemas = await DB.sequelize.showAllSchemas();
        console.log(`[Avatar log]: all schemas ==`, existSchemas, typeof existSchemas);
        if(existSchemas.indexOf(schema) < 0) {
          await DB.sequelize.createSchema(schema, { logging: true });
        }
        await DB.sequelize.sync(
          // {
          //   force: true,
          //   schema: 'node_midway'
          // }
        )
        // await Migration.init();
        console.log(`[Avatar log]: DB initialized!`);
    }

    async didReady() {
        console.log(`[Avatar log]: App did Ready!`);
    }

    async serverDidReady() {
        console.log(`[Avatar log]: Server did ready!`);
    }
}

export default AppBootHook;
