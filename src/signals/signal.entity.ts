import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  timeframe: string;

  @Column()
  signal: string;

  @Column('float')
  confidence: number;

  @Column('json')
  indicators: any;

  @Column('json')
  reasons: string[];

  @CreateDateColumn()
  createdAt: Date;
}
