const sum = (a: number, b: number) => {
  return a + b;
};

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  // expect(sum(0.1, 0.2)).toBe(0.3)
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
});

const myObj = jest.fn().mockReturnThis();

test('return this', () => {
  console.warn(myObj());
});

test('array containing numbers', () => {
  expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]));
});

test('array containing objects', () => {
  const objects = [
    {
      name: 'bob',
      age: 12,
    },
    {
      name: 'mike',
      age: 33,
    },
  ];
  expect(objects).toStrictEqual(
    expect.arrayContaining([{ name: 'mike', age: 33 }]),
  );
  expect(objects).not.toEqual(
    expect.arrayContaining([
      { name: 'mike', age: 33 },
      { name: 'bob', age: 32 },
    ]),
  );
});

test('mock implementation', () => {
  const mock = jest.fn(() => 'hello world');
  expect(mock()).toEqual('hello world');

  mock.mockImplementationOnce(() => 'HELLO WORLD!');
  expect(mock()).toEqual('HELLO WORLD!');
  expect(mock()).toEqual('hello world');

  mock.mockImplementation(() => 'HELLO WORLD!');
  expect(mock()).toEqual('HELLO WORLD!');

  mock.mockRestore();
  expect(mock()).toEqual(undefined);
});
