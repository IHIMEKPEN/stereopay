import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import "dotenv/config";
import { Image } from './image.entity';
// import { CLOUD_NAME, API_KEY, API_SECRET } from process.env.;
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(file: any, { description, title }: any): Promise<any> {
    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
      folder: "StereoPayMedia",
      use_filename: true,
      //  quality: 50, //reduce quality by 30%
      resource_type: "auto",
    });
    let type = file.mimetype == 'image/jpeg' ? 'IMAGE' : 'AUDIO'
    let image = {
      title: title,
      url: secure_url,
      public_id: public_id,
      softDelete: false,
      description: description,
      type: type

    }
    let media: any = await this.imageRepository.save(image);
    return { status: 'success', message: `Media Created Successfully`, media };

  }

  getHello(): string {
    return 'Stereo Pay API Running!';
  }
  async update(id: number, { status }: any): Promise<any> {
    // console.log(status)
    if (status!='Active'&& status!='Inactive' ) return { status: 'error', message: `only value 'Inactive' and 'Active'` }

    let media: any = await this.imageRepository.findOne({
      where: {
        id: id,
        softDelete: false
      },
    })
    if (!media) return { status: 'error', message: `media with id ${id} does not exist` }

    media = await this.imageRepository.update({
      id: id
    }, {

      status: status,


    })
  
    return {
      status: 'success', message: `Media Updated Successfully`,
      // data:media
    }
  }
  async get({page,perPage}:any): Promise<any> {
    const take = perPage|| 10
     page=page || 1;
    const skip= (page-1) * take ;
    let media: any = await this.imageRepository.find({
      where: {
        
        softDelete: false
      },
      take: take,
            skip: skip
    })
    // if (!media) return { status: 'error', message: `media with id ${id} does not exist` }
    return {
      status: 'success', message: `Media Fetch Successfully`,
      data: media
    };
  }
  async getById(id: number): Promise<any> {
    let media: any = await this.imageRepository.findOne({
      where: {
        id: id,
        softDelete: false
      },
    })
    if (!media) return { status: 'error', message: `media with id ${id} does not exist` }
    return {
      status: 'success', message: `Media Fetch Successfully`,
      data: media
    };
  }

  async search({ title, description }: any): Promise<any> {
    let media: any = await this.imageRepository.find({
      where: {
        title: Like(`%${title}%`),
        description: Like(`%${description}%`),
        softDelete: false
      },
    })
    if (!media) return { status: 'error', message: `no media found` }
    return {
      status: 'success', message: `Media Fetch Successfully`,
      data: media
    };
  }
  async delete(id: number): Promise<any> {
    let media: any = await this.imageRepository.findOne({
      where: {
        id: id,
        softDelete: false
      },
    })
    if (!media) return { status: 'error', message: `media with id ${id} does not exist` }
    media = await this.imageRepository.update({
      id: id
    }, {
      softDelete: true

    })

    return {
      status: 'success', message: `Media Deleted Successfully`,
      // data:media
    };
  }
}
