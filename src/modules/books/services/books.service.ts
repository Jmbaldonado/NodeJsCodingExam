import { Injectable, NotFoundException } from '@nestjs/common';
import { Books } from 'src/data/entities/books.entity';
import { CreateBooksInput } from '../dto/input/books.input';
import { BooksRepository } from '../repositories/books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async createBooks(createBooksInput: CreateBooksInput): Promise<Books> {
    return this.booksRepository.save(createBooksInput);
  }

  async findBook(id: string): Promise<Books> {
    return this.booksRepository.findOne(id);
  }

  async getAllBooks(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  async updateBooks(
    id: string,
    data: Partial<CreateBooksInput>,
  ): Promise<Books> {
    const book = await this.findBook(id);
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }

    await this.booksRepository.update(book.id, data);
    return this.findBook(book.id);
  }

  async deleteBookById(id: string): Promise<void> {
    const book = await this.findBook(id);
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }

    await this.booksRepository.delete(book.id);
  }
}
