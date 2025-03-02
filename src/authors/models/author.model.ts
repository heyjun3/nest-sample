import {
  Field,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
export class Name {
  @Column({ name: 'first_name' })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ name: 'last_name' })
  @Field({ nullable: true })
  lastName?: string;

  constructor(obj: Pick<Name, 'firstName' | 'lastName'>) {
    if (obj) {
      console.warn('name constructor');
      Object.assign(this, obj);
    }
  }

  fullName() {
    return this?.firstName ?? '' + this?.lastName ?? '';
  }
}

@Resolver(() => Name)
export class NameResolver {
  @ResolveField(() => String)
  fullName(@Parent() name: Name) {
    return name.fullName();
  }
}

@ObjectType()
@Entity({ name: 'author' })
export class Author {
  constructor(obj: Author) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  readonly id!: string;

  @Column(() => Name, { prefix: false })
  @Field(() => Name, { nullable: true })
  name?: Name;

  @Field(() => [Post], { nullable: true })
  @OneToMany(
    () => Post,
    (post: Post) => post.author,
    {
      nullable: true,
      lazy: true,
      cascade: ['insert', 'update', 'remove', 'soft-remove'],
    },
  )
  posts?: Promise<Post[]>;
}
