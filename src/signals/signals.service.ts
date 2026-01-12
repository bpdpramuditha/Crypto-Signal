import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal } from './signal.entity';

@Injectable()
export class SignalsService {
  constructor(
    @InjectRepository(Signal)
    private readonly repo: Repository<Signal>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
