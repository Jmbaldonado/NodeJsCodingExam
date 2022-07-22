import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/data/entities/books.entity';
import { BooksController } from './controllers/books.controller';
import { BooksRepository } from './repositories/books.repository';
import { BooksResolver } from './resolvers/books.resolver';
import { BooksService } from './services/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Books, BooksRepository])],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
