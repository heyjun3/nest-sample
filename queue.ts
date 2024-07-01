import { queue } from 'async';
import { EventEmitter } from 'stream';

async function queuetest() {
  const q = queue<number>(async (data, cb) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.warn(data);
    cb(null);
  });

  await (async () => {
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      q.push(i);
    }
  })();
  console.warn('push done');

  await q.drain();
  console.warn('wait done');
}

queuetest();
