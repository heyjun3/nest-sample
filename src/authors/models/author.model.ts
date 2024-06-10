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
  firstName?: string | undefined;

  @Column({ name: 'last_name' })
  @Field({ nullable: true })
  lastName?: string | undefined;

  constructor(obj: Pick<Name, 'firstName' | 'lastName'>) {
    if (obj) {
      console.warn('name constructor');
      Object.assign(this, obj);
    }
  }

  fullName() {
    return this?.firstName + this?.lastName;
  }
}

@Resolver(() => Name)
export class NameResolver {
  @ResolveField(() => String)
  fullName(@Parent() name: Name) {
    return name.fullName();
  }
}

@Entity({ name: 'author' })
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  readonly id: string;

  @Column(() => Name, { prefix: false })
  @Field(() => Name, { nullable: true })
  name?: Name;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
    nullable: true,
    lazy: true,
  })
  @Field(() => [Post], { nullable: true })
  posts?: Promise<Post[]> | Post[] | undefined;

  constructor(obj: Author) {
    if (obj) {
      this.id = obj.id;
      this.name = new Name(obj.name);
      this.posts = obj.posts;
    }
  }
}
