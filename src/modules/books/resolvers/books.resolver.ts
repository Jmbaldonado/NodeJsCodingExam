import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Books } from 'src/data/entities/books.entity';
import { CreateBooksInput } from '../dto/input/books.input';
import { BooksMapper } from '../dto/mapper/books.mapper';
import { BooksOutput } from '../dto/output/books.output';
import { BooksService } from '../services/books.service';

@Resolver(() => Books)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Mutation(() => BooksOutput)
  createBooks(
    @Args('createBooksInput') createBooksInput: CreateBooksInput,
  ): Promise<BooksOutput> {
    return this.booksService.createBooks(createBooksInput);
  }

  @Query(() => BooksOutput)
  findBook(@Args('id') id: string): Promise<BooksOutput> {
    return this.booksService.findBook(id);
  }

  @Query(() => [BooksOutput])
  async getAllBooks(): Promise<BooksOutput[]> {
    const books = await this.booksService.getAllBooks();
    return BooksMapper.mapArray(books);
  }
}
