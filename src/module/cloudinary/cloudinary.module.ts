import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

const multerMdule = MulterModule.register({
  dest: './upload',
});

@Module({
  imports: [multerMdule],
  providers: [CloudinaryService],
  exports: [CloudinaryService, multerMdule],

})
export class CloudinaryModule { }