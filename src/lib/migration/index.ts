import {DB} from '../../app/model/db';

export default class Migration {
  constructor() {}

  static async init() {
    // await DB.sequelize.query(`ALTER TABLE node_midway.school ADD COLUMN IF NOT EXISTS column_name VARCHAR(100) default 'aa' NOT NULL`);

    // 2020-06-18
    await DB.sequelize.query(`
      CREATE INDEX IF NOT EXISTS "i_user_phone"  ON "node_midway"."user" (phone)
    `);
    await DB.sequelize.query(`
      CREATE INDEX IF NOT EXISTS "i_code_account" ON "node_midway"."vrf_code" (account)
    `);
  }

  static async addColumn() {
    await DB.sequelize.query(`
      ALTER TABLE "node_midway"."entry" ADD COLUMN IF NOT EXISTS "author" VARCHAR(100)
    `);
  }
}
