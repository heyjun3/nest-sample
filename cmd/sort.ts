import { randomInt } from 'crypto';

type Row = {
  time: Date;
  lsn: string;
  first: number;
  second: number;
  timestamp: number;
};
const main = async () => {
  const records: Row[] = [];
  for (let i = 5_000_000; i > 0; i--) {
    const r = randomInt(1000);
    const now = new Date();
    records.push({
      time: now,
      lsn: `${i}/${r}`,
      first: i,
      second: r,
      timestamp: now.getTime(),
    });
  }
  const start = new Date();
  console.warn('start', start.getTime());
  records.sort((a, b) => {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;

    if (a.first < b.first) return -1;
    if (a.first > b.first) return 1;
    if (a.second < b.second) return -1;
    if (a.second > b.second) return 1;

    return 0;
  });
  console.warn('end', new Date().getTime() - start.getTime());
};

main();
