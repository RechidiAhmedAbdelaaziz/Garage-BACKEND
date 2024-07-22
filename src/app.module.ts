import { Module } from '@nestjs/common';
import { PostModule } from './module/post/post.module';
import { CloudinaryModule } from './core/modules/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

const dbModule = MongooseModule.forRoot(
  process.env.MONGO_URI,
  {
    dbName: 'Garage',
    connectionFactory: (connection) => {
      if (connection.readyState === 1) {
        console.log('Database Connected successfully >> ', connection.name);
      }
      connection.on('disconnected', () => {
        console.log('Database disconnected');
      });
      connection.on('error', (error) => {
        console.log('Database connection failed! for error: ', error);
      });
      return connection;
    },
  }
)




@Module({
  imports: [PostModule, CloudinaryModule, dbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
