import { provide } from 'midway';

@provide('UserService')
export default class UserService {

  async getUser() {
    return '123';
  }
}
