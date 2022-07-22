import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateBooksInput } from '../dto/input/books.input';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('update')
  updateBooks(
    @Body('id') id: string,
    @Body('data') data: Partial<CreateBooksInput>,
  ) {
    return this.booksService.updateBooks(id, data);
  }

  @Delete('delete')
  deleteBookById(@Body('id') id: string) {
    return this.booksService.deleteBookById(id);
  }
}
