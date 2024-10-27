import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { UserInputError } from '@nestjs/apollo';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GoogleCloudPubSubServer } from './handler/pubsubHandler';

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
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GoogleCloudPubSubServer({
      projectId: 'gsheet-355401',
      subscribers: ['nest-sub'],
    }),
  })
  await app.startAllMicroservices();
  await app.listen(8080);
}

bootstrap();
