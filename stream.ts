import { Transform, Writable, pipeline } from 'stream';
import * as fs from 'fs';

const src = fs.createReadStream('tsconfig.json');

let count = 0;
const dst = [];
const hashStream = new Transform({
  //   objectMode: true,
  transform(chunk, encoding, done) {
    count++;
    // done(null, { ...chunk });
    const data = JSON.parse(Buffer.from(chunk).toString());
    const buf = Buffer.from(JSON.stringify({ ...data, index: count++ }));
    done(null, buf);
    // this.push(buf);
    // done(null);
  },
});

const render = new Writable({
  write: (data, _, done) => {
    // dst.push(Buffer.from(data).toString());
    dst.push(data);
    done();
  },
});

// src
//   .pipe(hashStream)
//   .pipe(render)
//   .on('finish', () => {
//     console.log(JSON.parse(Buffer.from(dst[0]).toString()));
//   });
pipeline(src, hashStream, render, () => {
  console.log(dst);
});
