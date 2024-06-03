import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'author' })
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  readonly id: string;

  @Column({ name: 'first_name' })
  @Field({ nullable: true })
  firstName?: string | undefined;

  @Column({ name: 'last_name' })
  @Field({ nullable: true })
  lastName?: string | undefined;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
    nullable: true,
    lazy: true,
  })
  @Field(() => [Post], { nullable: true })
  posts?: Promise<Post[]> | Post[] | undefined;

  static of(data: Author) {
    const author = new Author();
    return Object.assign(author, data);
  }
}
