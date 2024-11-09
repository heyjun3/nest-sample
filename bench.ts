import * as Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('Map', () => {
    console.warn('Map');
  })
  .on('cycle', (event) => {
    console.warn(String(event.length));
  })
  .on('complete', () => {})
  .run({ async: true });
