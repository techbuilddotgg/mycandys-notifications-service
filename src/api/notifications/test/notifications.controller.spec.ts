import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { NotificationsController } from '../notifications.controller';
import { NotificationsService } from '../notifications.service';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';
import { NotificationsModule } from '../notifications.module';

describe('discounts controller test', () => {
  let moduleRef: TestingModuleBuilder,
    app: TestingModule,
    controller: NotificationsController;

  const notificationMock = {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    message: faker.commerce.productName(),
    type: faker.commerce.productMaterial(),
  };

  const discountServiceMock = {
    create: jest.fn(() => notificationMock),
    findById: jest.fn(() => notificationMock),
    findAll: jest.fn(() => [notificationMock]),
    update: jest.fn(() => notificationMock),
    delete: jest.fn(() => notificationMock),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [
        AuthModule,
        NotificationsModule,
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
    })
      .overrideProvider(NotificationsService)
      .useValue(discountServiceMock);

    app = await moduleRef.compile();
    controller = app.get(NotificationsController);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should find notification by id', async () => {
    const res = await controller.findById(notificationMock._id);
    expect(res).toEqual(notificationMock);
  });

  it('should find all notifications', async () => {
    const res = await controller.findAll();
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Array);
  });
});
