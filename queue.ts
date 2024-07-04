import { queue } from 'async';

async function queuetest() {
  const q = queue<number[]>(async (data, cb) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.warn(data);
    cb(null);
  }, 1);

  await (async () => {
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      q.push([[i, i + 1]]);
    }
  })();

  console.warn('push done');
  await q.drain();
  console.warn('wait done');
}

queuetest();
