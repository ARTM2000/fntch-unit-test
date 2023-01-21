import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_SERVER_HOST'),
          port: configService.get('MAIL_SERVER_PORT'),
          tls: { rejectUnauthorized: false },
          secure: false,
        },
        defaults: {
          from: configService.get(
            'MAIL_SERVER_FROM',
            'awesome blog <no-reply@awesome.blog>',
          ),
        },
      }),
    }),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
