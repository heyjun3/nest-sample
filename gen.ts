import { randomInt } from 'crypto';

type gen = () => Generator<number, void, unknown>;

function* generateor() {
  yield 1;
  yield 2;
  yield 3 * randomInt(100);
}

class GenRandomInt {
  constructor(
    private readonly cnt: number,
    private readonly max: number = 1000,
  ) {}

  async *genInt(max?: number) {
    for (let i = 0; i < this.cnt; i++) {
      yield randomInt(max ? max : this.max);
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        throw Error('test Error');
      } catch (e) {
        console.warn('catch 2', e);
      }
    }
    return;
  }
}

async function main() {
  const test: gen = generateor;
  for (const i of test()) {
    console.warn(i);
  }

  const genRandomInt = new GenRandomInt(10);
  try {
    for await (const i of genRandomInt.genInt(10)) {
      console.warn(i);
    }
  } catch (e) {
    console.warn('catch', e);
  }
}

main();
