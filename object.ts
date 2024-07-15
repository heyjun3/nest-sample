import * as util from 'util';

const inspect = (obj: any) =>
  console.warn(util.inspect(obj, false, null, true));

const user = {
  name: 'test',
  age: 12,
  toString: function () {
    return this.age;
  },
};

inspect(user);

const user2 = { ...user };
user2.age = 40;

inspect(user);
inspect(user2);

console.warn(user);
