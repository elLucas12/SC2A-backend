import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
