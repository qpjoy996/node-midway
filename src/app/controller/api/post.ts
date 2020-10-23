import { controller, get, post, put, del, provide, inject } from 'midway'

@provide()
@controller("/api/post")
export default class PostController {
  @inject("PostService")
  PostService: any;

  @get("/")
  async index(_ctx: any) {
    const query = {
      limit: parseInt(_ctx.query.limit, 10) || 10,
      offset: parseInt(_ctx.query.offset, 10) || 0,
    };
    _ctx.body = await this.PostService.list(query);
  }

  @get("/:id")
  async find(_ctx: any) {
    let id = parseInt(_ctx.params.id, 10);
    let result = await this.PostService.find(id);
    console.log(result, ' - - - -  : id', id)
    _ctx.body = result;
  }

  @post("/")
  async create(_ctx: any) {
    let body = _ctx.request.body;
    let result = await this.PostService.create(body)
    console.log(body, ' - - - - - - : body', result);
    _ctx.body = result;
  }

  @put("/")
  async update(_ctx: any) {
    const id = parseInt(_ctx.request.body.id, 10);
    _ctx.body = await this.PostService.update(id, _ctx.request.body.updates);
  }

  @post("/delete/:id")
  async delete(_ctx: any) {
    const id = parseInt(_ctx.params.id, 10);
    _ctx.body = await this.PostService.softDelete(id);
  }

  @del("/:id")
  async destroy(_ctx: any) {
    const id = parseInt(_ctx.params.id, 10);
    _ctx.body = await this.PostService.destroy(id);
  }
}
