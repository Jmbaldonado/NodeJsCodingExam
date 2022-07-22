import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBooksInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  isbn: string;
}
