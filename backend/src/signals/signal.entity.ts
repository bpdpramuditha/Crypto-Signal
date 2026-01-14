import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 20 })
  symbol: string;

  @Index()
  @Column({ length: 10 })
  timeframe: string;

  @Index()
  @Column({ length: 10 })
  signal: 'BUY' | 'SELL' | 'HOLD';

  @Column('float')
  confidence: number;

  @Column('json')
  indicators: any;

  @Column('json')
  reasons: string[];

  @Column('float', { nullable: true })
  aiUpProbability?: number;

  @CreateDateColumn()
  createdAt: Date;
}
