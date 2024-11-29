import { fromBinary } from '@bufbuild/protobuf';
import { GetAuthorResponseSchema } from '../src/gen/api/author/v1/author_pb';

const main = async () => {
  const res = await fetch('http://localhost:8080/api/author');
  // console.warn(Buffer.from(await res.arrayBuffer()).toJSON())

  // const buf = await res.arrayBuffer()
  const buf = Buffer.from(await res.text(), 'base64');
  console.warn(buf);
  const uint = Uint8Array.from(buf);
  const dec = fromBinary(GetAuthorResponseSchema, uint);
  console.warn(dec);
  // console.warn(JSON.parse(buf.toString()))
};

main();
