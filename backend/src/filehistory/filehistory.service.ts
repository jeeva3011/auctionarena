import { Injectable } from '@nestjs/common';
import { CreateFilehistoryInput } from './dto/create-filehistory.input';
import { UpdateFilehistoryInput } from './dto/update-filehistory.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Filehistory } from './entities/filehistory.entity';
import { Repository } from 'typeorm';
import { AuctionService } from 'src/auction/auction.service';

@Injectable()
export class FilehistoryService {

  constructor(@InjectRepository(Filehistory) private fileRepo: Repository<Filehistory>,
            private auctionService : AuctionService){}

            
  public async create(createFilehistoryInput: CreateFilehistoryInput) {
    const auction = await this.auctionService.findOne(createFilehistoryInput.auctionid)
    return this.fileRepo.save({
      auction: auction,
      auctionid: createFilehistoryInput.auctionid,
      filename: createFilehistoryInput.filename,
      errorsrecords: createFilehistoryInput.errorsrecords,
      successrecords: createFilehistoryInput.successrecords,
      errorfilepath: createFilehistoryInput.errorfilepath,
      totalrecords: createFilehistoryInput. totalrecords,
      filepath: createFilehistoryInput.filepath
    });
  }

  async findAll(auctionid: number) {
    return await this.fileRepo.findOne({where:{auctionid:auctionid}});
  }

  async findOne(id: number, errorfilepath: string) {
    const file =  await this.fileRepo.findOne({where:{fileid:id}});
    file.errorfilepath = errorfilepath;
    this.fileRepo.save(file)
    return file
  }

  update(id: number, updateFilehistoryInput: UpdateFilehistoryInput) {
    return `This action updates a #${id} filehistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} filehistory`;
  }
}
