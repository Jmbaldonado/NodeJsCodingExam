import { Books } from 'src/data/entities/books.entity';
import { BooksOutput } from '../output/books.output';

export class BooksMapper {
  static map(book: Books): BooksOutput {
    if (!book) {
      return undefined;
    }

    return {
      id: book.id,
      title: book.title,
      description: book.description,
      isbn: book.isbn,
    };
  }

  static mapArray(books: Books[]): BooksOutput[] {
    if (!books || books.length <= 0) {
      return [];
    }

    return books.map((book) => this.map(book));
  }
}
