import { Transform, Writable, pipeline } from 'stream';
import * as fs from 'fs';

const src = fs.createReadStream('tsconfig.json');

const dst = [];
const hashStream = new Transform({
  transform(chunk, encoding, done) {
    dst.push(chunk);
    done();
  },
});

const render = new Writable({
  objectMode: true,
  write: (data, _, done) => {
    dst.push(data);
    done();
  },
});

src
  .pipe(hashStream)
  //   .pipe(render)
  .on('finish', () => {
    console.log(dst);
  });
// pipeline(src, hashStream, render);
