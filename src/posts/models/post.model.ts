import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';
import {
  JoinColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'post' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('uuid', { name: 'author_id' })
  @Field(() => String)
  authorId: string;

  @Column({ name: 'title' })
  @Field()
  title: string;

  @Column({ name: 'votes' })
  @Field(() => Int, { nullable: true })
  votes?: number;

  @ManyToOne(() => Author, (author) => author.posts, {
    lazy: true,
  })
  @JoinColumn({ name: 'author_id' })
  @Field(() => Author)
  author: Author;
}
