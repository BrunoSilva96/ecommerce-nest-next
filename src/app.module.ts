import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [UserModule, AuthModule, MailModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
