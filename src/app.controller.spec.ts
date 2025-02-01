import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// const mock = {
//   getHello: jest.fn(() => 'Hello World!')
// }
const getHello = jest.fn(() => 'Hello World!')

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: {
          getHello,
        },
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('mock app service', () => {
      // jest.spyOn(mock, 'getHello').mockImplementation(() => "hello mock")
      getHello.mockImplementationOnce(() => 'hello mock')

      expect(appController.getHello()).toBe('hello mock')
    })
  });
});
