import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'books' })
export class Books extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isbn: string;
}
