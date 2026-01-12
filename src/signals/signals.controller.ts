import { Controller, Get } from '@nestjs/common';
import { SignalsService } from './signals.service';

@Controller('signals')
export class SignalsController {
  constructor(private readonly service: SignalsService) {}

  @Get()
  getSignals() {
    return this.service.findAll();
  }
}
