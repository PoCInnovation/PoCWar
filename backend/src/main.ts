import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('PocWar')
    .setDescription('PoCWar API')
    .setVersion('1.0')
    .addTag('poc')
    .addBearerAuth({
      type: 'apiKey',
      bearerFormat: 'JWT',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('openapi', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}

bootstrap()
  .catch((e: Error) => {
    // eslint-disable-next-line no-console
    console.log(e);
  });
