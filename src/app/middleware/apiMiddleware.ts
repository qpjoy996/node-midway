import { WebMiddleware, provide, config } from 'midway';

@provide()
export class ApiMiddleware implements WebMiddleware {
  @config('hello')
  helloConfig: any;

  resolve() {
    return async(ctx:any, next:any) => {
      console.log(`[Avatar log]: thought api`);
      ctx.api = 'Api:' + this.helloConfig.world;
      console.log(ctx, ' this is ctx');
      await next();
    }
  }
}
