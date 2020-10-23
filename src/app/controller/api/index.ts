import {controller, provide, get, post, Context, inject} from 'midway';

/**
 * @controller api 登录接口
 */
@provide()
@controller('/api')
export default class ApiHomeController {

  @get('/')
  async index(ctx: Context) {
    ctx.body = 'ctx.api';
  }

  @inject()
  ctx: Context;

  @inject()
  userService: any;

  /**
     * @summary 注册用户
     * @description 注册用户，记录用户账户/密码/
     * @router post /api/doRegist
     * @request body registUserRequest *body
     */
  @post('/doRegist')
  async doRegist() {
    this.ctx.body = 'doRegist' + await this.userService.getUser();
  }

  /**
  * @summary 用户登录
  * @description 用户登录
  * @router post /api/doLogin
  * @request body registUserRequest *body
  */
  @post('/doLogin')
  async doLogin() {
    this.ctx.body = 'doLogin' + await this.userService.getUser();
  }

  @get('/api', {middleware: ['apiMiddleware']})
  async api(ctx: Context) {
    ctx.body = ctx.api;
  }
}
