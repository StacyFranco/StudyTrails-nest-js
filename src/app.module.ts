import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChapterModule } from './chapter/chapter.module'
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LessonModule } from './lesson/lesson.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
    ChapterModule,
    LessonModule,
    SubjectModule
    
  ],
  controllers: [],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard, },
    {provide: APP_GUARD, useClass: RolesGuard, },
  ],
})
export class AppModule {}

