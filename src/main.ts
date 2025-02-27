import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  await app.listen(3000);
  console.log(`🚀 Server is running on http://127.0.0.1:3000`);
}

bootstrap();
