import {inject, provide} from 'midway';

@provide('ApolloService')
export class ApolloService {
  @inject('UserService')
  UserService: any;

  @inject('PostService')
  PostService: any;

  user() {
    return this.UserService;
  }

  post() {
    return this.PostService;
  }
}
