import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234567890',
    database: 'stereopay',
    entities: [Image],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Image]),
  MulterModule.register({
    dest: './files',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files')
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}