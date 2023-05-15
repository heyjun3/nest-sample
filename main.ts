import { ConsoleLogger } from '@nestjs/common';

const lst = [1, 2, 3, 4];
for (const i of lst) {
  console.log(i);
}

lst.forEach((i) => {
  console.log(i);
});

lst.map((i) => {
  console.log(i * i);
});

const l = lst.filter((i) => {
  return i % 2;
});

console.log(l);
console.log(lst);

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

const v: unknown = { a: 1, b: 2 };

if (isObject(v)) {
  console.log(Object.keys(v));
}

function* generateNumbers() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

for (const v of generateNumbers()) {
  console.log(v);
}

type User = {
  name: string;
  age: number;
};

function getUser(): Promise<User> {
  return new Promise((resolve) => {
    const u: User = {
      name: 'taro',
      age: 44,
    };
    resolve(u);
  });
}

class Person {}

class Human {}

const p: Person = new Person();
const h: Person = new Human();

type Cat = {
  name: string;
  size: number;
};

console.log(h instanceof Human);
const c: Cat = {
  name: 'manbo',
  size: 10,
};
console.log(c);

const u = 0 ?? 10;
const u1 = undefined ?? 10;
console.log(u);
console.log(u1);

const regexp1 = /(?<first>0(8|9)0)-(?<second>\d{4})-(?<third>\d{4})/gu;
console.log(regexp1.test('080-0000-9990'));
console.log(regexp1.test('080-１１１１-9990'));
console.log(regexp1.test('080-00二0-9990'));

const r = regexp1.exec('080-0000-9990');
console.log(r?.groups?.first);
console.log(r?.groups?.second);
console.log(r?.groups?.third);

const s = '080-0000-9999';
console.log(s.match(regexp1));

type cat = typeof c;

console.log(typeof c == 'object');

function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}

function gen<A, B = A, C = B>(a: A, b: B, c: C) {
  console.log(a);
  console.log(b);
  console.log(c);
}

gen<string, number>('aaa', 22, 999);
gen<string>('a', 'aa', 'aaa');
