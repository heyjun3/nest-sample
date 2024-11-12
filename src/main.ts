import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { UserInputError } from '@nestjs/apollo';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GoogleCloudPubSubServer } from './handler/pubsubHandler';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        console.warn('errors', errors);
        return new UserInputError('test');
      },
    }),
  );
  // app.connectMicroservice<MicroserviceOptions>({
  //   strategy: new GoogleCloudPubSubServer({
  //     projectId: 'gsheet-355401',
  //     subscribers: ['nest-sub'],
  //   }),
  // });
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'api.author.v1',
        protoPath: '/app/dist/api/author/v1/author.proto',
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(8080);
}

bootstrap();
