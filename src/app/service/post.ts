import { provide, inject } from "midway";
import {errorHandler, successHanlder} from '../../lib/utils';

@provide("PostService")
export class PostService {
  @inject()
  PostModel: any;

  async list(options: any) {
    try {
      const result = await this.PostModel.findAndCountAll({
        limit: options.limit,
        offset: options.offset,
      });
      return successHanlder(result);
    }catch(e) {
      return errorHandler(e)
    }
  }

  async find(id: any) {
    try {
      let result = await this.PostModel.findByPk(id, {
        attributes: ["id", "title", "post_content", "createdTime", "modifiedTime"],
      });
      return successHanlder(result);
    }catch(e) {
      return errorHandler(e);
    }
  }

  async create(options: any) {
    try {
      const post = await this.PostModel.create(options);
      return successHanlder(post.id);
    } catch(e) {
      return errorHandler(e);
    }
  }

  async update(id: any, updates: any) {
    try {
      const result = await this.PostModel.update(updates, {
        where: { id },
      });
      console.log(`[Avatar log]:`, result);
      return successHanlder(result[0] > 0);
    }catch(e) {
      return errorHandler(e);
    }
  }

  async softDelete(id: any) {
    try {
      const result = await this.PostModel.destroy({
        where: {
          id,
        },
      });
      console.log(`[Avatar log]: destory`, result)
      return successHanlder(result);
    }catch(e) {
      return errorHandler(e)
    }
  }

  async destroy(id: any) {
    try {
      const result = await this.PostModel.destroy({
        where: { id },
        force: true
      });
      console.log(`[Avatar log]: destroy`, result)
      return successHanlder(result > 0);
    }catch(e) {
      return errorHandler(e)
    }
  }
}
