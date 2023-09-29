import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cors = require("cors")
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(7000);
  console.log('Server running on the Port: 7000');
}
bootstrap();
