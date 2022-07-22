import { Books } from 'src/data/entities/books.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Books)
export class BooksRepository extends Repository<Books> {}
