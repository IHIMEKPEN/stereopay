import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/media')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: { description: string, title: string }): Promise<string> {
    // console.log(file)
    return await this.appService.create(file, body)
  }

  @Delete('/media/:id')
  async delete(@Param() params: { id: number }): Promise<string> {
    // console.log(params.id)
    return await this.appService.delete(params.id);
  }

  @Get('/media/search')
  async Search(@Query() query: { title: string, description: string }): Promise<string> {

    return await this.appService.search(query);
  }
  @Get('/media')
  async get(@Query() query: { page: string, perPage: string }): Promise<string> {

    return await this.appService.get(query);
  }

  @Get('/media/:id')
  async getById(@Param() params: { id: number }): Promise<string> {
    return await this.appService.getById(params.id);
  }

  @Patch('/media/:id')
  async update(@Param() params: { id: number }, @Body() body: {  status: string }): Promise<string> {
    
    return await this.appService.update(params.id, body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // @Put()
  // update(): string {
  //   return this.appService.getHello();
  // }



}
