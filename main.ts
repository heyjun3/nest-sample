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
