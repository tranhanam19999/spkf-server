import { 
  Controller,
  Post,
  UseInterceptors, 
  UploadedFile,
  UploadedFiles,
  UseFilters,
  Param,
  Query,
  Delete,
  Get,
  Req,
  Res  } from '@nestjs/common';

import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage } from 'multer';

import {editFileName,imageFileFilter} from '../editFileName';
import {MediaService} from '../service/media.service';
import { HttpExceptionFilter } from '../http-exception.filter'

@Controller('public/media')
@UseFilters(new HttpExceptionFilter())
export class MediaController {
  constructor(private readonly mediaService:MediaService){}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file-name', {
      storage: diskStorage({
        destination: './public/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file,@Query() query,@Req() req ) {
    await this.mediaService.deleteManyByName(query.websiteId)
    const newMedia= {
    name: query.websiteId,
    createdDate: Date.now().toString(),
    type: "image",
    postId: "",
    url: `http://${req.get('host')}/image/${file.filename}`,
    }
    return {
      code:200,
      result:await this.mediaService.create(newMedia)
    }
  }

  @Post('upload/:postId')
  @UseInterceptors(
    FileInterceptor('file-name', {
      storage: diskStorage({
        destination: './public/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFilePost(@UploadedFile() file,@Param('postId') id,@Req() req ) {
    const newMedia= {
    name: id,
    createdDate: Date.now().toString(),
    type: "image",
    postId: id,
    url: `http://${req.get('host')}/image/${file.filename}`,
    }
    return {
      code:200,
      result:await this.mediaService.create(newMedia)
    }
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res, @Req() req) {
  const host= await req.get('host');
  console.log(host);
  return res.sendFile(image, { root: './public/upload' });
  }
}

@Controller('private/media')
@UseFilters(new HttpExceptionFilter())
export class PrivateMediaController{
  constructor(private readonly mediaService:MediaService){}

  @Delete('/delete/:id')
  async deleteMedia(@Param('id') id){
    console.log(id)
    return await this.mediaService.delete(id)
  }
}

