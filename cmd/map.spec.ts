import { z, ZodSchema } from 'zod';

type Permission = {
  id: boolean;
  user: boolean;
};

const s = z.object({
  id: z.boolean(),
  user: z.boolean(),
});

class StrictMap<T extends ZodSchema, U extends any> {
  private map: Map<string, U>;
  constructor(private schema: T, iterable?: [z.infer<T>, U][]) {
    this.map = new Map<string, U>();
    if (!iterable) {
      return;
    }
    for (const iter of iterable) {
      this.map.set(JSON.stringify(this.schema.parse(iter[0])), iter[1]);
    }
  }
  set(key: z.infer<T>, value: U) {
    const parsedKey = this.schema.parse(key);
    this.map.set(JSON.stringify(parsedKey), value);
  }
  get(key: z.infer<T>): U | undefined {
    const parsedKey = this.schema.parse(key);
    return this.map.get(JSON.stringify(parsedKey));
  }
  dump() {
    for (const [k, v] of this.map) {
      console.warn('key', k, 'value', v);
    }
  }
}

test('test', () => {
  const map = new Map<Permission, boolean>([
    [{ id: false, user: false }, false],
  ]);
  expect(map.get({ id: false, user: false })).toBeUndefined();

  const weakMap = new WeakMap<Permission, boolean>([
    [{ id: false, user: false }, false],
  ]);
  expect(weakMap.get({ id: false, user: false })).toBeUndefined();

  const strMap = new Map<string, boolean>([
    [JSON.stringify({ id: false, user: false }), false],
  ]);
  expect(strMap.get(JSON.stringify({ id: false, user: false }))).toBe(false);
  expect(
    strMap.get(JSON.stringify({ user: false, id: false })),
  ).toBeUndefined();

  const strictMap = new StrictMap<typeof s, boolean>(s);
  strictMap.set({ id: false, user: false }, false);

  expect(strictMap.get({ id: false, user: false })).toBe(false);
  expect(strictMap.get({ user: false, id: false })).toBe(false);
  expect(
    strictMap.get({ ...{ user: false, id: false, test: undefined } }),
  ).toBe(false);
  expect(
    strictMap.get({ ...{ user: false, id: false, n: null, test: 'test' } }),
  ).toBe(false);

  strictMap.set({ id: false, user: false }, true);
  expect(strictMap.get({ id: false, user: false })).toBe(true);
});
