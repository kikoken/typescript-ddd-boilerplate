import { injectable } from 'inversify';

@injectable()
export class HelloApplicationService {
  async getHello() {
    return 'Hello';
  }
}