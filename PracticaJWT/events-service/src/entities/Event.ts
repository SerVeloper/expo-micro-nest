import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'timestamp', nullable: false })
  date!: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  place!: string;

  @Column({ type: 'integer', nullable: false })
  capacity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}