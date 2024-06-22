import * as util from 'util';

const inspect = (obj: any) =>
  console.warn(util.inspect(obj, false, null, true));

const user = {
  name: 'test',
  age: 12,
};

inspect(user);

const user2 = { ...user };
user2.age = 40;

inspect(user);
inspect(user2);
