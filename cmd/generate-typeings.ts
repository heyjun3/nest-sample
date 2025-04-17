import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./cmd/**/*.graphql'],
    path: join(process.cwd(), 'cmd/graphql.ts'),
    outputAs: 'class',
})