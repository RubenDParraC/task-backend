import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://user1:dbUserPassword@cluster0.xz2gm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/task-manager-db'),
    TasksModule,
  ],
})
export class AppModule {}
