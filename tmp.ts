import * as fs from 'fs';
import * as stream from 'stream';

const writeStream = () => {
  const st = new stream.Duplex({
    write(data, _encoding, next) {
      console.warn(data);
      next();
    },
    read() {
      this.push('test');
    },
  });
  st.write('aaaa');
  st.on('data', (chunk) => console.warn(Buffer.from(chunk).toString()));
};

const readFileStream = () => {
  const src = fs.createReadStream('schema.gql', {
    encoding: 'utf-8',
    highWaterMark: 10,
  });
  src.on('data', (chunk) => process.stdout.write('data' + chunk));
};
const main = async () => {
  // readFileStream()
  writeStream();
};

const EventType = {
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
} as const
type EventType = keyof typeof EventType

enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

type Success = {
  kind: EventType,
  status: Status.SUCCESS,
}
type Failed = {
  kind: EventType,
  status: Status.FAILED,
  message: string,
}
type Pending = {
  kind: EventType,
  status: Status.PENDING,
  reason: string,
}
type Result = Success | Failed | Pending

const event = () => {
  const results: Result[] = []
  results.push({ kind: EventType.CREATE, status: Status.SUCCESS }, { kind: EventType.UPDATE, status: Status.FAILED, message: 'test' }, { kind: EventType.CREATE, status: Status.PENDING, reason: 'reason' })

  for (const result of results) {
    switch (result.status) {
      case Status.FAILED:
        console.warn(result.message)
        break;
      case Status.SUCCESS:
        console.warn(result)
        break;
      case Status.PENDING:
        console.warn(result.reason)
        break;
      default:
        console.warn(result)
    }
  }
  const faileds = results.filter((result) => result.status != Status.FAILED);
}

main();
