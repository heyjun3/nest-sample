class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  constructor(obj: Omit<User, 'fullName'>) {
    Object.assign(this, obj);
  }
  fullName() {
    return this.firstName + this.lastName;
  }
}

type T1<T> = {
  [K in keyof T]:
    | {
        before: T[K];
        after: T[K];
      }
    | T[K];
};

const diff = <T extends object>(obj1: T, obj2: T) => {
  const result = {} as T1<T>;
  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      result[key] = obj1[key];
      continue;
    }
    if (obj1[key] !== obj2[key]) {
      result[key] = {
        before: obj1[key],
        after: obj2[key],
      };
    }
  }
  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      result[key] = obj2[key];
    }
  }
  return result;
};

const u1 = new User({
  id: 'id',
  firstName: 'first',
  lastName: 'last',
});

const u2 = new User({
  id: 'id2',
  firstName: 'first',
  lastName: 'LAST',
});

console.warn(diff(u1, u2));
