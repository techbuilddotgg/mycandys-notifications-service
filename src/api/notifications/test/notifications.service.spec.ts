import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { NotificationsService } from '../notifications.service';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationsModule } from '../notifications.module';
import { faker } from '@faker-js/faker';

describe('NotificationsService test', () => {
  let moduleRef: TestingModuleBuilder,
    notificationsService: NotificationsService,
    app: TestingModule,
    notificationRepository: NotificationRepository,
    notification: { title: string; message: string; type: string };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [NotificationsModule],
    });
    app = await moduleRef.compile();
    notificationsService = app.get<NotificationsService>(NotificationsService);
    notificationRepository = app.get<NotificationRepository>(
      NotificationRepository,
    );
  });

  beforeEach(async () => {
    notification = {
      title: faker.commerce.productName(),
      message: faker.word.words(5),
      type: faker.commerce.productMaterial(),
    };
  });

  afterAll(async () => {
    await notificationRepository.dropCollection();
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
    expect(notificationRepository).toBeDefined();
    expect(notificationsService).toBeDefined();
  });

  it('should create notification', async () => {
    const res = await notificationsService.create(notification);
    expect(res).toBeDefined();
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('createdAt');
    expect(res).toHaveProperty('updatedAt');
  });

  it('should find notification by id', async () => {
    const res = await notificationsService.create(notification);
    const found = await notificationsService.findById(res._id);
    expect(found).toBeDefined();
    expect(found).toHaveProperty('_id');
    expect(found._id).toEqual(res._id);
  });

  it('should find all notifications', async () => {
    const res = await notificationsService.findAll();
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Array);
  });

  it('should update notification', async () => {
    const res = await notificationsService.create(notification);
    const updated = await notificationsService.update(res._id, {
      title: 'test',
    });
    expect(updated).toBeDefined();
    expect(updated).toHaveProperty('_id');
    expect(updated).toHaveProperty('title');
    expect(updated.title).toEqual('test');
  });

  it('should delete notification', async () => {
    const res = await notificationsService.create(notification);
    const deleted = await notificationsService.delete(res._id);
    expect(deleted).toBeDefined();
    expect(deleted).toBeTruthy();
  });
});
