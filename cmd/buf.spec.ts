import { create, fromBinary, toJson, fromJson } from '@bufbuild/protobuf';
import { AuthorSchema } from '../src/gen/api/author/v1/author_pb';
import { BooksSchema } from '../src/gen/api/book/v1/book_pb';

test('buf', async () => {
  const author = create(AuthorSchema, {
    id: 'test',
    fullname: 'fullname',
  });
  expect(toJson(AuthorSchema, author)).toEqual({
    id: 'test',
    fullname: 'fullname',
  });
});

test('order', async () => {
  const books1 = create(BooksSchema, {
    books: [
      {
        id: 'id1',
        name: 'name1',
      },
      {
        id: 'id2',
        name: 'name2',
      },
    ],
  });
  const books2 = create(BooksSchema, {
    books: [
      {
        id: 'id2',
        name: 'name2',
      },
      {
        id: 'id1',
        name: 'name1',
      },
    ],
  });
  const books3 = fromJson(BooksSchema, {
    books: [
      {
        id: 'id2',
        name: 'name2',
      },
      {
        id: 'id1',
        name: 'name1',
      },
    ],
  });

  books1.books.sort((a, b) => a.id.localeCompare(b.id));
  books2.books.sort((a, b) => a.id.localeCompare(b.id));
  books3.books.sort((a, b) => a.id.localeCompare(b.id));

  expect(toJson(BooksSchema, books1)).toEqual(toJson(BooksSchema, books2));
  expect(toJson(BooksSchema, books1)).toEqual(toJson(BooksSchema, books3));
});
