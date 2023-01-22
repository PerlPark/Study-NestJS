import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import dummy from '../src/dummy';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('health');
  });

  describe('/exhibits', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/exhibits')
        .expect(200)
        .expect(dummy);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/exhibits')
        .send({
          title: 'Test',
          startDate: 2023,
          endDate: 2024,
          location: ['서울', '예술의 전당'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/exhibits')
        .send({
          title: 'Test',
          startDate: 2023,
          endDate: 2024,
          location: ['서울', '예술의 전당'],
          other: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/exhibits').expect(404);
    });
  });

  describe('/exhibits/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/exhibits/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/exhibits/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/exhibits/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/exhibits/1').expect(200);
    });
  });
});
