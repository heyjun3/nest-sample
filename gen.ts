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
    console.warn('run gen int');
    for (let i = 0; i < this.cnt; i++) {
      yield randomInt(max ? max : this.max);
      await new Promise((resolve) => setTimeout(resolve, 100));
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
  const generate = genRandomInt.genInt(10);
  console.warn('get generate');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  try {
    for await (const i of generate) {
      console.warn(i);
    }
  } catch (e) {
    console.warn('catch', e);
  }
}

main();
