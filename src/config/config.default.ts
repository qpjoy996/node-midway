import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';
import * as env from '../env';

import {SentryService} from '../app/service/sentry';

const path = require('path')
export type DefaultConfig = PowerPartial<EggAppConfig>
interface MyEggAppInfo extends EggAppInfo {
  appDir?: string
}
export default (appInfo: MyEggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_7758258'

  // add your config here
  config.middleware = [
    'trace',
    'apollo',
    'graphql',
    // 'ApiMiddleware'
  ]
  config.static = {
    dir: [path.join(appInfo.appDir, '/output'), path.join(appInfo.appDir, '/src/app/public')],
    prefix: '/'
  }

  const userConfig = {
    sequelize: {
      username: env.PG_USERNAME,
      password: env.PG_PASSWORD,
      database: env.PG_DATABASE,
      port: env.PG_PORT,
      host: env.PG_HOST,
      dialect: "postgres",
    },
    graphql: {
      router: "/graphql",
      app: true, //是否加载到 app 上,默认为 true
      agent: false, //是否加载到 agent 上,默认为 false
      graphiql: true, //是否加载开发者工具 playground,默认为 true
      uploads: true, //是否开启文件上传功能，默认开启
      defaultEmptySchema: true,

      //subscriptions的值为<Object>|<String>|false 见https://www.apollographql.com/docs/apollo-server/api/apollo-server/
      //如果为String 表示订阅的路径
      //如果为false 关闭订阅
      //如果为object 可以添加path,keepAlive,onConnect,onDisconnect
      subscriptions: false,
      formatError: (error:any, app:any) => {
        app.logger.error(error);
        return error;
      },

      context: ({ ctx }:any) => ({ ctx }),
      // introspection: !isProd,
      // playground: !isProd,
      // mocks: false,
      debug: false, // 发生错误时,是否包含错误堆栈信息,生产环境要设置为false
    },
    swaggerdoc: {
      dirScanner: './app/controller/api',
      apiInfo: {
        title: 'Avatar midway',
        description: 'swagger-ui for Render document.',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      enable: true,
      routerMap: false,
    },

    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [
        'http://192.168.114.47:3000',
        'http://localhost:3000',
        'http://davinci-activity.lilithgames.com',
        'https://davinci-activity.lilithgames.com',
        'http://davinci.lilith.com',
        'https://davinci.lilith.com'
      ],
    },
    cors: {
      // origin: '*',
      allowMethods: 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
      maxAge: 600,
      credentials: true
    },

    onerror: {
      // errorPageUrl: 'https://eggjs.com/500.html',
      all(err: any, ctx: any) {
        SentryService && SentryService.sentry &&  SentryService.sentry.captureException && SentryService.sentry.captureException(err);
        // console.log(' dododoodo in sentry!');
        // ctx.body = {
        //   code: -1,
        //   error: err,
        // };
        // ctx.set('Content-Type', 'application/json');
        ctx.body = `<h3>${err.message}</h3>`;
        ctx.status = 500;
      },
      html(err: any, ctx: any) {
        // html hander
        ctx.body = '<h3>error html</h3>';
        ctx.status = 500;
      },
      json(err: any, ctx: any) {
        // json hander
        ctx.body = { message: 'error' };
        ctx.status = 500;
      },
      jsonp(err: any, ctx: any) {
        // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
      },
    },

    hello: {
      world: 'hello world'
    },
  }
  return {
    ...config,
    ...userConfig
  }
}
