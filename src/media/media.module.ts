import { Module } from '@nestjs/common';
import { MediaController, PrivateMediaController } from './controller/media.controller';
import { MediaService } from './service/media.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema} from './schema/media.schema';

@Module({
  imports: [MulterModule.register({
    dest: './public/image',
  }),
  MongooseModule.forFeature([{name:Media.name,schema:MediaSchema}])],
  controllers: [MediaController, PrivateMediaController],
  providers: [MediaService]
})
export class MediaModule {}
