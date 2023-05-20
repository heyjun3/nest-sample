import { Injectable } from '@nestjs/common';

import { Author } from './author.model';

@Injectable()
export class AuthorsService {
  private readonly authors: Author[];
  constructor() {
    this.authors = [
      {
        id: 1,
        posts: [
          {
            id: 1,
            title: 'test',
          },
        ],
      },
    ];
  }

  findOneById(id: number): Author {
    return this.authors[id];
  }
}
