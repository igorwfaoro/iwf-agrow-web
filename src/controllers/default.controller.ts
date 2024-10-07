import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../../package.json';
import { Public } from '../decorators/public';

@Controller()
export class DefaultController {
  @Get()
  @Public()
  public info() {
    return {
      name: 'iwf-grow-api',
      version: packageJson.version
    };
  }

  @Get('health-check')
  @Public()
  public healthCheck() {
    return true;
  }
}
