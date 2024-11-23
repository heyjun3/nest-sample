import { createClient } from '@connectrpc/connect';
import {
  createConnectTransport,
  createGrpcTransport,
} from '@connectrpc/connect-node';
import { AuthorService } from './gen/api/author/v1/author_pb';

const transport = createGrpcTransport({
  baseUrl: 'http://127.0.0.1:5000',
});
const client = createClient(AuthorService, transport);

const main = async () => {
  const r = await client.getAuthor(
    { id: '1' },
    { headers: { 'Content-Type': 'application/json' } },
  );
  console.warn(r);
};

main();
