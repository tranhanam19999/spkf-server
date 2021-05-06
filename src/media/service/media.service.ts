import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateMediaDto} from '../dto/create-Media.dto';

import {Media,MediaDocument} from '../schema/media.schema';

@Injectable()
export class MediaService {
    constructor(
        @InjectModel(Media.name)
        private mediaModel:Model<MediaDocument>,
    ){}

    create(createMediaDto:CreateMediaDto){
        const createMedia= new this.mediaModel(createMediaDto);
        return createMedia.save();
    }

    async deleteByname (name:string){
        try{
            let media= await this.mediaModel.findOne({name})
            if(media){
                await this.mediaModel.deleteOne({name})
                await media.save()
                return 'OK'
            }
        }
        catch{
            return 'False';
        }
    }
    
    async deleteManyByName (name:string){
        try{
            await this.mediaModel.deleteMany({name})
            return 'OK'
        }
        catch{
            return 'False';
        }
    }

    async delete(id:string){
        let deleteMedia = await this.mediaModel.findByIdAndDelete(id)
        console.log(deleteMedia)
        if (deleteMedia) {
            return {
                code:200,
                status:"OK"
            }
        }
        return { 
            code:500,
            status:'Failed'
        }
    }
}
