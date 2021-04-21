import { HelloApplicationService } from '@application/hello/HelloApplicationService';
import { TYPES } from '@constants/types';
import { inject } from 'inversify';
import { controller, httpGet, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { ok } from '../processors/response';

@controller('/hello')
export class HelloController {

  constructor(
    @inject(TYPES.HelloApplication) private readonly service: HelloApplicationService,
  ) {}
  
  @httpGet('')
  async getHello(@request() req: Request, @response() res: Response) {
    const message = await this.service.getHello();
    return res.json(ok(message, 'Successfully retrieved greeting message'));
  }
}