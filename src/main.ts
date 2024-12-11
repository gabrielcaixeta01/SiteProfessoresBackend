import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => {
    console.log(`🚀 Application is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
